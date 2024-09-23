import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.room_group_name = self.scope['url_route']['kwargs']['room_name']

		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)

		await self.accept()
        
		await self.send(text_data=json.dumps({
			'type':'log',
			'message':f'Connection established with the room {self.room_group_name}'
		}))

	async def disconnect(self, close_code):
		print("=======disconnected=======")
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)

	async def receive(self, text_data):
		text_data_json = json.loads(text_data)

		user = self.scope["user"];
		if user.is_authenticated:
			username = user.username
		else:
			username = "Anonymous"

		print("message received:", text_data_json)

		await self.channel_layer.group_send(
			self.room_group_name,
			{
				'type':'chat_message',
				'username': username,
				'message':text_data_json['message'],
			}
		)

	async def chat_message(self, event):
		message = event["message"]
		user = event["username"]

		await self.send(text_data=json.dumps({
			'type':'chat',
			'username': user,
			'message':message
		}))