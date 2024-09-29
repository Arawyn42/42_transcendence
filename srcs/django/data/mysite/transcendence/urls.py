from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views
from django.urls import path
from .views import (
    ListFriendRequestsView,
    ListFriendsView,
    ProfileView,
    login_view,
    logout_view,
    register_view,
    verify_2fa,
    enable_2fa,
    ProtectedView,
    EditProfileView,
    UpdateScoreView,
    SendFriendRequestView,
    AcceptFriendRequestView,
)

urlpatterns = [
	path("", views.home, name="home"),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('2fa/verify/', verify_2fa, name='verify_2fa'),
    path('2fa/enable/', enable_2fa, name='enable_2fa'),
    path('protected/', ProtectedView.as_view(), name='protected'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('friends/', ListFriendsView.as_view(), name='list_friends'),
    path('friend-requests/', ListFriendRequestsView.as_view(), name='list_friend_requests'),
    path('edit-profile/', EditProfileView.as_view(), name='edit_profile'),
    path('update-score/', UpdateScoreView.as_view(), name='update_score'),
    path('send-friend-request/', SendFriendRequestView.as_view(), name='send_friend_request'),
    path('accept-friend-request/', AcceptFriendRequestView.as_view(), name='accept_friend_request'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


