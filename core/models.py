from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.postgres.fields import JSONField


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class GameInfo(models.Model):
    id = models.AutoField(blank=True, null=False, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    winner = models.IntegerField(blank=True, null=False)
    board = JSONField(blank=False, null=False)
    borders = JSONField(blank=True, null=True)
    score = JSONField()
    started_at = models.IntegerField()
    ended_at = models.IntegerField()
