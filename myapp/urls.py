from django.urls import path
from . import views

urlpatterns = [
    path('', views.mi_vista, name='n_mi_vista'),
    path('consult_crud/', views.consult_crud, name='n_consult_crud'),
]