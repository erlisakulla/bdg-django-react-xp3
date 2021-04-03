
from rest_framework import serializers

from .models import User,Game,Role,Week

class UserSerializer(serializers.ModelSerializer):
    """
    User Serializer for Registeration.
    """
    class Meta:
        model = User
        fields = ('email', 'name', 'is_instructor', 'password',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class GameSerializer(serializers.ModelSerializer):
    """
    User Serializer for Game View.
    """
    class Meta:
        model=Game
        fields="__all__"


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Role
        fields="__all__"

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model=Week
        fields="__all__"
