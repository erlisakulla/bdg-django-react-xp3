"""beergameapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include,re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import permissions

#documentation imports 
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework import routers

schema_view = get_schema_view(
   openapi.Info(
      title="Beergame API",
      default_version='v1',
      description="BeerGame Backend API Documentation and testing playground",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

from api.views import gameview,userview,registerview,roleview

router = routers.DefaultRouter()
router.register('game', gameview,'Game')
router.register('role', roleview)

urlpatterns = [
    path("api/",include(router.urls)),
    path("api/user/",userview.as_view()),
    path("api/register/",registerview.as_view()),
    
    #path("api/viewroles/",rolesview.as_view()),
    # path("api/roleregister/<int:pk>",roleregister.as_view()),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenObtainPairView.as_view(), name='token_refresh'),
]



urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]