from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.templatetags.static import static
import os
from django.conf import settings


from pathlib import Path

# Create your views here.
 
def mi_vista(request):
    return render(request, 'lav_home.html')

@csrf_exempt
def consult_crud(request):
    if request.method == 'POST':
        sector = request.POST.get('sector')
        numStack = request.POST.get('numStack')

        file_count =calculeStack(sector)

        # NOTE : VALIDAMOS PARA VALIDAR QUE NÚMERO DE STACK RENDERIZAR
        if(numStack != 'undefined'):
            StackSelected = int(numStack)
        else:
            StackSelected = file_count

        # NOTE : ESTABLECEMOS LAS RUTAS
        ruta_videos_json = os.path.join(settings.BASE_DIR, f'myapp/media/LAV_videos/{sector}videos/Stack_n{StackSelected}/DATA_VIDEOS.json')
        ruta_sections_json = os.path.join(settings.BASE_DIR, f'myapp/media/LAV_videos/{sector}videos/DATA_VIDEOS_SECTIONS.json')

        # NOTE LEEMOS LOS ARCHIVOS
        with open(ruta_videos_json, 'r') as archivo:
            videos_data = json.load(archivo)
            
        with open(ruta_sections_json, 'r') as archivo:
            section_data = json.load(archivo)

        return JsonResponse({"total_stacks": file_count, "videos_json": videos_data, "sections_json": section_data, "StackSelected": StackSelected})
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
def calculeStack(sector):
    # NOTE OBTENEMOS EL ULTIMO STACK EN BASE AL NUMERO DE CARPETAS QUE HAY
    # Obtén la ruta completa del archivo JSON en el directorio static
    ruta_sector = os.path.join(settings.BASE_DIR, f'myapp/media/LAV_videos/{sector}videos/')
    # NOTE : CONTAR ARCHIVOS
    ruta = Path(ruta_sector)
    file_count = len(list(ruta.glob('*')))
    return file_count - 1
