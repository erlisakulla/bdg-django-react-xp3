from django.contrib import admin

# Register your models here.
from .models import User,Game,Role,Week
admin.site.register(User)
admin.site.register(Game)
admin.site.register(Role)
admin.site.register(Week)