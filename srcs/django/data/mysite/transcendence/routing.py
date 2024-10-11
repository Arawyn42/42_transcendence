from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
	re_path(r'ws/socket-server/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
	re_path(r'ws/status/', consumers.FriendStatusConsumer.as_asgi()),
]