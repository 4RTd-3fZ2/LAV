from django.urls import path
from . import views

urlpatterns = [
    path('video_processor/', views.video_processor, name='n_video_processor'),
    path('create_video/', views.create_video, name='n_create_video'),
    path('deleted_video/', views.deleted_video, name='n_deleted_video'),
    path('select_videos/', views.select_videos, name='n_select_videos'),
    path('slecet_guias/', views.slecet_guias, name='n_slecet_guias'),

    path('datosNumeriosLAV/', views.datosNumeriosLAV, name='n_datosNumeriosLAV'),
    path('movedatatolav/', views.moveDataToLAV, name="n_movedatatolav"),
]