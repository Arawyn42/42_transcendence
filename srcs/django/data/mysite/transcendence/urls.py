from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
	path("", views.home, name="home"),
	path('register/', views.register_view, name='register'),
	path('login/', views.login_view, name='login'),
	path('edit-profile/', views.edit_profile_view, name='edit-profile'),
	path('profile/', views.profile_view, name='profile'),
	path('update-scores/', views.update_scores, name='update-scores'),
	path('send-friend-request/', views.send_friend_request, name='send_friend_request'),
 	path('list-friend-requests/', views.list_friend_requests, name='list_friend_requests'),
    path('accept-friend-request/', views.accept_friend_request, name='accept_friend_request'),
    path('list-friends/', views.list_friends, name='list_friends'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)