from django.shortcuts import render, get_object_or_404, redirect
from .forms import CustomUserCreationForm
from .models import UserProfile
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect
from .forms import ProfileForm, UserForm
from .models import Friendship
from .models import FriendRequest
from .models import Block
from .utils import send_email_code
import json
import random
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from . import models
from django.db.models import Q
from .models import MatchHistory

def home(request):
	return render(request, 'index.html')

@csrf_protect
def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        first_name = request.POST.get('first_name')

        # Check if username or email already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'error': 'User already exists.'})
        if User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email already exists.'})

        # Create and save new user
        user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name)
        
        # Initialize user profile if using a separate profile model
        profile = UserProfile.objects.create(user=user, victory_count=0, defeat_count=0)

        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Invalid request method.'})

class EditProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_form = UserForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, request.FILES, instance=request.user.userprofile)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return JsonResponse({'success': True})
        else:
            errors = {
                'user_form_errors': user_form.errors,
                'profile_form_errors': profile_form.errors,
            }
            return JsonResponse({'success': False, 'errors': errors}, status=400)
    def get(self, request):
        return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)
    


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            verification_code = generate_verification_code()
            request.session['2fa_code'] = verification_code
            send_email_code(user.email, verification_code)
            request.session['username_2fa'] = username
            return JsonResponse({'success': True, '2fa_required': True})
        else:
            return JsonResponse({'success': False, 'error': 'Identifiants incorrects'}, status=401)

    return JsonResponse({'success': False, 'error': 'Méthode non supportée'}, status=405)

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        friend_requests = FriendRequest.objects.filter(to_user=user)
        friends = user.userprofile.friends.all()

        # Récupérer les 5 derniers matchs de l'utilisateur (en tant que joueur 1 ou 2)
        match_history = MatchHistory.objects.filter(user=request.user).order_by('-date')

        match_history = [
            {
                'opponent': match.opponent,
                'result': 'win' if match.result == 'win' else 'lose',
                'date': match.date.strftime('%Y-%m-%d %H:%M')
            }
            for match in match_history
        ]


        friend_requests_data = [
            {
                'id': friend_request.id,
                'from_user': friend_request.from_user.username
            }
            for friend_request in friend_requests
        ]

        friends_data = [
            friend.user.username for friend in friends
        ]

        data = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'victory_count': user.userprofile.victory_count,
            'defeat_count': user.userprofile.defeat_count,
            'friend_requests': friend_requests_data,
            'friends': friends_data,
            'match_history': match_history  # Ajouter l'historique des matchs dans la réponse
        }

        return JsonResponse(data, status=200)
    

class ProfileFriendView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        friend_requests = FriendRequest.objects.filter(to_user=user)
        friends = user.userprofile.friends.all()

        # Récupérer les 5 derniers matchs de l'utilisateur (en tant que joueur 1 ou 2)
        match_history = MatchHistory.objects.filter(user=request.user).order_by('-date')

        match_history = [
            {
                'opponent': match.opponent,
                'result': 'win' if match.result == 'win' else 'lose',
                'date': match.date.strftime('%Y-%m-%d %H:%M')
            }
            for match in match_history
        ]


        friend_requests_data = [
            {
                'id': friend_request.id,
                'from_user': friend_request.from_user.username
            }
            for friend_request in friend_requests
        ]

        friends_data = [
            friend.user.username for friend in friends
        ]

        data = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'victory_count': user.userprofile.victory_count,
            'defeat_count': user.userprofile.defeat_count,
            'friend_requests': friend_requests_data,
            'friends': friends_data,
            'match_history': match_history  # Ajouter l'historique des matchs dans la réponse
        }

        return JsonResponse(data, status=200)


class UpdateScoreView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        result = request.POST.get('result')  # 'win' or 'lose'
        opponent = request.POST.get('opponent')  # Récupérer le nom de l'opposant depuis la requête

        profile = request.user.userprofile
        
        if result == 'win':
            profile.victory_count += 1
            match_result = "win"
        elif result == 'lose':
            profile.defeat_count += 1
            match_result = "lose"
        else:
            return JsonResponse({'success': False, 'error': 'Invalid result'}, status=400)
        
        profile.save()

        # Créer l'historique du match
        match = MatchHistory.objects.create(user=request.user, opponent=opponent, result=match_result)

        # Limiter l'historique des matchs à 5 entrées
        match_history = MatchHistory.objects.filter(user=request.user).order_by('-date')
        if match_history.count() > 5:
            match_history.last().delete()

        return JsonResponse({'success': True})

    def get(self, request):
        return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)

class SendFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = json.loads(request.body)
        target_username = data.get('username')
        
        try:
            to_user = User.objects.get(username=target_username)
            friend_request, created = FriendRequest.objects.get_or_create(from_user=request.user, to_user=to_user)
            
            if created:
                return JsonResponse({'success': True, 'message': 'Friend request sent!'})
            else:
                return JsonResponse({'success': False, 'error': 'Friend request already sent.'})
        
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'User not found.'})
    
    def get(self, request):
        return JsonResponse({'success': False, 'error': 'Invalid request method.'})

class ListFriendRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        friend_requests = FriendRequest.objects.filter(to_user=request.user)
        friend_requests_data = [
            {
                'id': friend_request.id,
                'from_user': friend_request.from_user.username
            }
            for friend_request in friend_requests
        ]
        return JsonResponse({'friend_requests': friend_requests_data}, status=200)

class AcceptFriendRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = json.loads(request.body)
        request_id = data.get('request_id')

        try:
            friend_request = FriendRequest.objects.get(id=request_id, to_user=request.user)

            from_user_profile = friend_request.from_user.userprofile
            to_user_profile = request.user.userprofile

            to_user_profile.friends.add(from_user_profile)
            from_user_profile.friends.add(to_user_profile)

            # Supprime la requête d'ami une fois acceptée
            friend_request.delete()

            return JsonResponse({'success': True})
        except FriendRequest.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Friend request not found'}, status=404)

    def get(self, request):
        return JsonResponse({'success': False, 'error': 'Invalid request method.'}, status=400)

class ListFriendsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_profile = request.user.userprofile
        friends = user_profile.friends.all()

        friends_data = [
            {'username': friend.user.username} for friend in friends
        ]
        return JsonResponse({'friends': friends_data}, status=200)

def enable_2fa(request):
    if request.method == 'POST':
        verification_code = generate_verification_code()
        request.session['2fa_code'] = verification_code 

        email = request.user.email
        send_email_code(email, verification_code)  
        return JsonResponse({'success': True})
    
    return JsonResponse({'success': False, 'error': 'method not supported'}, status=400)

def verify_2fa(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  
            code_entered = data.get('2fa_code')  
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid data format'}, status=400)

        stored_code = request.session.get('2fa_code')

        if not stored_code:
            return JsonResponse({
                'success': False,
                'error': 'No 2FA code found in session'
            }, status=400)

        if code_entered == stored_code:
            del request.session['2fa_code']

            refresh = RefreshToken.for_user(request.user)
            access_token = str(refresh.access_token)

            return JsonResponse({
                'success': True,
                'access_token': access_token
            }, status=200)
        else:
            return JsonResponse({
                'success': False,
                'error': 'Code 2FA incorrect'
            }, status=400)

    return JsonResponse({'success': False, 'error': 'method not supported'}, status=400)

def generate_verification_code():
    return str(random.randint(100000, 999999))


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Tu as accédé à une ressource protégée"})

def check_user_exists(request):
    if request.method == 'GET':
        username = request.GET.get('username', None)
        if username:
            exists = User.objects.filter(username=username).exists()
            return JsonResponse({'exists': exists}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)

def block_user(request, username):
	if request.method == 'POST':
		blocker = request.user
		blocked = get_object_or_404(User, username=username)
		if Block.objects.filter(blocker=blocker, blocked=blocked).exists():
			return JsonResponse({'success': False, 'error': 'User already blocked.'})
		Block.objects.create(blocker=blocker, blocked=blocked)
		return JsonResponse({'success': True})
	return JsonResponse({'success': True, 'error': 'Invalid request method.'})

def unblock_user(request, username):
	if request.method == 'POST':
		try:
			blocked_user = User.objects.get(username=username)
			block_entry = Block.objects.get(blocker=request.user, blocked=blocked_user)
			block_entry.delete()
			still_blocked = Block.objects.filter(
				models.Q(blocker=request.user, blocked=blocked_user) |
				models.Q(blocker=blocked_user, blocked=request.user)
			).exists()
			return JsonResponse({'success': True})
		except User.DoesNotExist:
			return JsonResponse({'success': False, 'error': 'User not found'})
		except Block.DoesNotExist:
			return JsonResponse({'success': False, 'error': 'Not blocked'})
	else:
		return JsonResponse({'success': False, 'error': 'Invalid request'})

def isblocked_user(request, username):
	if request.method == 'GET':
		try:
			blocked_user = User.objects.get(username=username)
			block_entry = Block.objects.get(blocker=request.user, blocked=blocked_user)
			return JsonResponse({'success': True, 'isBlocked': True})
		except User.DoesNotExist:
			return JsonResponse({'success': True, 'isBlocked': False})
		except Block.DoesNotExist:
			return JsonResponse({'success': True, 'isBlocked': False})
		except Exception as error:
			return JsonResponse({'success': False, 'error': str(error)})
	else:
		return JsonResponse({'success': False, 'error': 'Invalid request'})