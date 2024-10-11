from channels.generic.websocket import AsyncWebsocketConsumer
import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()

from asgiref.sync import sync_to_async
from django.contrib.auth.models import User
from django.db import models
from .models import Message, Room, Block
import json

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.room_name = self.scope['url_route']['kwargs']['room_name']
		self.room_group_name = f'chat_{self.room_name}'

		await self.get_or_create_room(self.room_name)

		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)
		await self.accept()

		# retrieve all conversation messages
		recent_messages = await self.get_recent_messages(self.room_name)
		for message in recent_messages:
			await self.send(text_data=json.dumps({
				'message': message['content'],
				'username': message['username'],
            }))

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)

	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		message = text_data_json['message']
		username = text_data_json['username']

		# check blocked
		interlocutor = self.room_name.replace(username, "").replace("_", "")
		if await self.is_blocked(username, interlocutor):
			await self.send(text_data=json.dumps({
				'error': 'You are blocked or have blocked this user.'
        	}))
			return

		await self.save_message(self.room_name, username, message)

		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type': 'chat_message',
				'message': message,
				'username': username,
			}
		)

	async def chat_message(self, event):
		message = event['message']
		username = event['username']

		# check blocked
		interlocutor = self.room_name.replace(username, "").replace("_", "")
		if await self.is_blocked(username, interlocutor):
			return 

		await self.send(text_data=json.dumps({
			'message': message,
			'username': username,
		}))

	@sync_to_async
	def save_message(self, room_name, username, message):
		room = Room.objects.get(name=room_name)
		Message.objects.create(room=room, username=username, content=message)

	@sync_to_async
	def get_recent_messages(self, room_name, limit=50):
		room = Room.objects.get(name=room_name)
		return list(room.messages.all().order_by('timestamp')[:limit].values(
			'content', 'username'))

	@sync_to_async
	def get_or_create_room(self, room_name):
		print("ROOM CREATED: " + room_name);
		return Room.objects.get_or_create(name=room_name)
	
	@sync_to_async
	def is_blocked(self, username, interlocutor):
		blocker = User.objects.get(username=username)
		blocked = User.objects.get(username=interlocutor)

		return Block.objects.filter(
			models.Q(blocker=blocker, blocked=blocked) |
			models.Q(blocker=blocked, blocked=blocker)
		).exists()

	def get_interlocutor(self, room_name, current_user):
		room = Room.objects.get(name=room_name)
		if room.user1 == current_user:
			return room.user2
		return room.user1

# import json
# from channels.generic.websocket import AsyncWebsocketConsumer

# class ChatConsumer(AsyncWebsocketConsumer):
# 	async def connect(self):
# 		self.room_group_name = self.scope['url_route']['kwargs']['room_name']

# 		await self.channel_layer.group_add(
# 			self.room_group_name,
# 			self.channel_name
# 		)

# 		await self.accept()
        
# 		await self.send(text_data=json.dumps({
# 			'type':'log',
# 			'message':f'Connection established with the room {self.room_group_name}'
# 		}))

# 	async def disconnect(self, close_code):
# 		print("=======disconnected=======")
# 		await self.channel_layer.group_discard(
# 			self.room_group_name,
# 			self.channel_name
# 		)

# 	async def receive(self, text_data):
# 		text_data_json = json.loads(text_data)

# 		user = self.scope["user"];
# 		if user.is_authenticated:
# 			username = user.username
# 		else:
# 			username = "Anonymous"

# 		print("message received:", text_data_json)

# 		await self.channel_layer.group_send(
# 			self.room_group_name,
# 			{
# 				'type':'chat_message',
# 				'username': username,
# 				'message':text_data_json['message'],
# 			}
# 		)

# 	async def chat_message(self, event):
# 		message = event["message"]
# 		user = event["username"]

# 		await self.send(text_data=json.dumps({
# 			'type':'chat',
# 			'username': user,
# 			'message':message
# 		}))