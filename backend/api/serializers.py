
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.contrib.auth.password_validation import validate_password

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


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance


class GameSerializer(serializers.ModelSerializer):
    """
    User Serializer for Game View.
    """
    class Meta:
        model=Game
        fields="__all__"
        extra_kwargs = {'instructor': {'read_only': True},'rounds_completed' :{'read_only': True}}


#isplayer - not instructor validator for RoleSerializer
# this will allow only players to play the game.

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Role
        fields=['id','downstreamPlayer','upstreamPlayer','associatedGame','roleName','playedBy']
        read_only_fields=('id','downstreamPlayer','upstreamPlayer','associatedGame','roleName')
    
        validators = [
            UniqueTogetherValidator(
                queryset=Role.objects.all(),
                fields=['associatedGame', 'playedBy'],
                message=" Player can only register for 1 Role in Each Game"
            ),
        ]


class OrderSerializer(serializers.Serializer):
    quantity=serializers.IntegerField(min_value=0)
    class Meta:
        fields=['quantity']


class RoleWeekSerializer(serializers.ModelSerializer):
    roleweeks= serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    class Meta:
        model=Role
        fields=['id','playedBy', 'roleweeks']

class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model=Week
        fields="__all__"

#for post methods without any body
class NullSerializer(serializers.Serializer):
    pass