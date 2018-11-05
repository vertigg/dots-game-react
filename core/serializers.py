from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from core.models import GameInfo


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user


class GameInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameInfo
        fields = ('winner', 'board', 'borders',
                  'score', 'started_at', 'ended_at')
