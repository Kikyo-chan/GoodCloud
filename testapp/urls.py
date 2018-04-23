from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^test_keystone', views.get_keystone),
]