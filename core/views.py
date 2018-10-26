from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from core.forms import StyledUserCreationForm
from core.serializers import UserSerializer


def index(request):
    """Main React app"""
    return render(request, 'index.html')


@csrf_exempt
@api_view(["GET"])
def get_user(request):
    return Response({'user': request.user.username})


@api_view(['POST'])
@permission_classes((AllowAny,))
def signup(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.save()
        created_user = User.objects.get(username=request.data['username'])
        token = created_user.auth_token.key
        return Response({"token": token}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': serialized.errors}, status=status.HTTP_400_BAD_REQUEST)
