from django.contrib import admin
from core.models import GameInfo


class GameInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'winner', 'score')


admin.site.register(GameInfo, GameInfoAdmin)
