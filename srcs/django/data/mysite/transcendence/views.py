from django.shortcuts import render, get_object_or_404, redirect
from .forms import CustomUserCreationForm
from .models import UserProfile
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect
from .forms import ProfileForm, UserForm
from .models import Friendship
from .models import FriendRequest
import json
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

@login_required
def edit_profile_view(request):
    if request.method == 'POST':
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
    
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)
    
@csrf_protect
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Identifiants incorrects'})
    
    return JsonResponse({'success': False, 'error': 'Méthode non supportée'}, status=400)

@login_required
def profile_view(request):
    user = request.user
    # Récupérer les requêtes d'amis adressées à l'utilisateur
    friend_requests = FriendRequest.objects.filter(to_user=user)
    friends = user.userprofile.friends.all()
    # Préparer les données des requêtes d'amis
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
    # Préparer les données de l'utilisateur
    data = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'victory_count': user.userprofile.victory_count,
        'defeat_count': user.userprofile.defeat_count,
        'friend_requests': friend_requests_data,  # Inclure les requêtes d'amis dans les données JSON
        'friends': friends_data,
    }

    return JsonResponse(data)
@login_required
def update_scores(request):
    if request.method == 'POST':
        result = request.POST.get('result')  # 'win' ou 'lose'
        
        # Récupère le profil de l'utilisateur actuel
        profile = request.user.userprofile
        
        # Met à jour les compteurs en fonction du résultat
        if result == 'win':
            profile.victory_count += 1
        elif result == 'loose':
            profile.defeat_count += 1
        
        profile.save()  # Sauvegarde les modifications
        
        return JsonResponse({'success': True})
    
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)

@csrf_protect
def send_friend_request(request):
    if request.method == 'POST':
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
    
    return JsonResponse({'success': False, 'error': 'Invalid request method.'})

@login_required
def list_friend_requests(request):
    # List the friend requests received by the current user
    friend_requests = FriendRequest.objects.filter(to_user=request.user)
    return render(request, 'list_friend_requests.html', {'friend_requests': friend_requests})

@login_required
def accept_friend_request(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        request_id = data.get('request_id')

        try:
            # Récupère la requête d'ami
            friend_request = FriendRequest.objects.get(id=request_id, to_user=request.user)

            # Récupère le profil des deux utilisateurs
            from_user_profile = friend_request.from_user.userprofile
            to_user_profile = request.user.userprofile

            # Ajoute l'ami pour les deux utilisateurs
            to_user_profile.friends.add(from_user_profile)
            from_user_profile.friends.add(to_user_profile)

            # Supprime la requête d'ami une fois acceptée
            friend_request.delete()

            return JsonResponse({'success': True})
        except FriendRequest.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Friend request not found'}, status=404)

    return JsonResponse({'success': False, 'error': 'Invalid request method.'}, status=400)

@login_required
def list_friends(request):
    user_profile = request.user.userprofile
    friends = user_profile.friends.all()

    friends_data = [
        {'username': friend.user.username} for friend in friends
    ]

    return JsonResponse({'friends': friends_data})
