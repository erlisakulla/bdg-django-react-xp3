from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, name,  password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, name, password, **other_fields)

    def create_user(self, email, name, password, **other_fields):

        if not email:
            raise ValueError('You must provide an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email,
                          name=name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField('email address', unique=True)
    name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_instructor = models.BooleanField(default=False)
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name




#Game Model 
class Game(models.Model):
    session_length = models.IntegerField()
    distributorPresent = models.BooleanField()
    wholesalerPresent = models.BooleanField()
    active=models.BooleanField()
    info_sharing=models.BooleanField(default=False)
    info_delay=models.IntegerField(default=2 )
    holding_cost = models.FloatField(default=1)
    backlog_cost = models.FloatField(default=1)
    instructor = models.ForeignKey(User,limit_choices_to={'is_instructor': True}, on_delete=models.CASCADE)
    rounds_completed = models.IntegerField(default=0)
    isDefaultGame=models.BooleanField()
    starting_inventory = models.IntegerField(default=0)

class Role(models.Model):
    roleName=models.CharField(max_length=30)
    associatedGame= models.ForeignKey(Game,on_delete=models.CASCADE,related_name='gameroles')
    gonext=models.BooleanField(default=False)
    ordered=models.BooleanField(default=False)
    downstreamPlayer=models.ForeignKey("self", null=True,blank=True, on_delete=models.CASCADE,related_name='%(class)s_downstreamPlayer')
    upstreamPlayer=models.ForeignKey("self", null=True, blank=True,on_delete=models.CASCADE,related_name='%(class)s_upstreamPlayer')
    playedBy=models.ForeignKey(User,null=True,  blank=True,limit_choices_to={'is_instructor':False},on_delete=models.CASCADE,related_name="playerrole")
    class Meta: #Can play as only one Role 
        unique_together=('playedBy','associatedGame',)
    def __str__(self):
        return (self.roleName + " of Game " + str(self.associatedGame.id))
    
class Week(models.Model):
    number=models.IntegerField()
    inventory=models.IntegerField(default=0)
    backlog=models.IntegerField(default=0)
    demand=models.IntegerField(default=0)
    incoming_shipment=models.IntegerField(default=0)
    outgoing_shipment=models.IntegerField(default=0)
    order_placed=models.IntegerField(blank=True,null=True)
    cost=models.IntegerField()
    associatedRole= models.ForeignKey(Role, on_delete=models.CASCADE,related_name="roleweeks")






@receiver(post_save,sender=Game)
def onGameCreation(sender, instance,created,**kwargs):
    if created:
        # dosomething
        retailer=Role.objects.create(roleName="Retailer", associatedGame=instance)
        Factory=Role.objects.create(roleName="Factory", associatedGame=instance)

        if(instance.wholesalerPresent and instance.distributorPresent):
            wholesaler=Role.objects.create(roleName="Wholesaler", associatedGame=instance)
            distributor=Role.objects.create(roleName="Distributor", associatedGame=instance)

            retailer.upstreamPlayer=wholesaler

            wholesaler.downstreamPlayer=retailer
            wholesaler.upstreamPlayer=distributor

            distributor.downstreamPlayer=wholesaler
            distributor.upstreamPlayer=Factory

            Factory.downstreamPlayer=distributor
            wholesaler.save()
            distributor.save()
        elif instance.wholesalerPresent:
            wholesaler=Role.objects.create(roleName="Wholesaler", associatedGame=instance)
            retailer.upstreamPlayer=wholesaler
            
            wholesaler.downstreamPlayer=retailer
            wholesaler.upstreamPlayer=Factory

            Factory.downstreamPlayer=wholesaler
            wholesaler.save()
        elif instance.distributorPresent:
            distributor=Role.objects.create(roleName="Distributor", associatedGame=instance)
            retailer.upstreamPlayer=distributor
            
            distributor.downstreamPlayer=retailer
            distributor.upstreamPlayer=Factory
            
            Factory.downstreamPlayer=distributor
            distributor.save()
        else:
            retailer.upstreamPlayer=Factory
            Factory.downstreamPlayer=retailer
        retailer.save()
        Factory.save()



#On Role Creation 
@receiver(post_save,sender=Role)
def onRoleCreation(sender, instance,created,**kwargs):
    if created:
        week=Week.objects.create(number=1,associatedRole=instance,
        inventory=instance.associatedGame.starting_inventory,
        cost=instance.associatedGame.starting_inventory*instance.associatedGame.holding_cost)
        week.save()