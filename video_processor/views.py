from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from video_processor.models import guia, video
import os
import glob
import base64
from django.http import JsonResponse

from PIL import Image
import io

from django.conf import settings
# Create your views here.

def video_processor(request):
    print("Estamos en video processor!")
    return render(request, 'videoProcessor_home.html')

#region # TODO: CREATE VIDEO
@csrf_exempt
def create_video(request):
    if request.method == 'POST':
        video_name = request.POST.get('video_name')
        old_name = request.POST.get('old_name')
        code = request.POST.get('code')
        acronym = request.POST.get('acronym')
        attach_file = request.FILES.get('attach_file')
        images_num = request.POST.get('images_num')
        fecha = request.POST.get('fecha')
        position = request.POST.get('position')

        #images captured
        images_list = []
        for i in range(int(images_num)):
            images_list.append(request.POST.get(f'generated_img_{i+1}'))

        if attach_file is None:
            return JsonResponse({"error": "No hay archivo adjunto"}, status=400)
        _, extension = os.path.splitext(attach_file.name) # Obtenemos la extencion del archivo

        new_video_name = video_name.replace(' ', '_')
        file_name = new_video_name+"-"+acronym+"-"+code+"-"+fecha+"-"+position+"-GO6"
        write_file(file_name, attach_file, images_num, extension, images_list)
        save_video(video_name, old_name, extension, file_name, code, acronym, images_num, fecha, position)

        return JsonResponse({'messaje': 'successfull'})
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

#region # TODO: DELETED VIDEO
@csrf_exempt
def deleted_video(request):
    if request.method == 'POST':
        item = request.POST.get('num_item')
        item = None
        if item is None:
            # NOTE : ELIMINAR TODOS LOS VIDEOS
            video.objects.all().delete()
            delete_file(item)
        else:
            # NOTE : ELIMINAR UN VIDEO
            video.objects.filter(num_item=item).delete()
            delete_file(item)
        return JsonResponse({'messaje': 'successfull'})
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

#region # TODO: SELECT VIDEOS
@csrf_exempt
def select_videos(request):
    myvideo = video.objects.all()[::-1]
    
    data = []
    for i in myvideo:
        data.append({'video_name': i.video_name, 'old_name': i.old_name, 'extension': i.extension, 'file_name': i.file_name, 'code': i.code, 'acronym': i.acronimo, 'images_num': i.num_images, 'fecha': i.fecha, 'position': i.position})

    resultados_json = list(data)
    return JsonResponse({"data": resultados_json})

#region # TODO: SELECTS GUIAS
@csrf_exempt
def slecet_guias(request):
    myvideo = guia.objects.all()


    data = []
    for i in myvideo:
        data.append({'name': i.name, 'description': i.description, 'acronimo': i.acronimo})

    resultados_json = list(data)
    return JsonResponse({"data": resultados_json})

from pathlib import Path
@csrf_exempt
def datosNumeriosLAV(request):
    if request.method == 'POST':
        categoria = request.POST.get('categoria')
        stack = request.POST.get('stack')

        ruta_categoria = os.path.join(settings.BASE_DIR, f'myapp/media/LAV_videos/{categoria}videos/Stack_{stack}/videos')
        
        # NOTE : CONTAR ARCHIVOS
        ruta = Path(ruta_categoria)
        file_count = len(list(ruta.glob('*')))

        return JsonResponse({"data": file_count})
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

import json

@csrf_exempt
def moveDataToLAV(request):
    if request.method == 'POST':
        categoria = request.POST.get('categoria')
        stack = request.POST.get('stack')
        jsonVideos = request.POST.get('jsonVideos')
    
        # NOTE : RUTAS DE LOS VIDEOS
        ruta_source_videos = os.path.join(settings.BASE_DIR, f'static/app_video_processor/tmp/videos')
        ruta_dest_videos = os.path.join(settings.BASE_DIR, f'myapp/media/LAV_videos/{categoria}videos/Stack_{stack}/videos')

        # NOTE : RUTAS DE LAS IMAGENES
        ruta_source_images = os.path.join(settings.BASE_DIR, f'static/app_video_processor/tmp/images')
        ruta_dest_images = os.path.join(settings.BASE_DIR, f'myapp/media/LAV_videos/{categoria}videos/Stack_{stack}/images')

        # NOTE : OBTENER EL JSON DE LOS VIDEOS
        ruta_dest_json = os.path.join(settings.BASE_DIR, f'myapp/media/LAV_videos/{categoria}videos/Stack_{stack}/DATA_VIDEOS.json')

        # NOTE : RUTA DEL JSON SECTIONS
        ruta_json_sections = os.path.join(settings.BASE_DIR, f'myapp/media/LAV_videos/{categoria}videos/DATA_VIDEOS_SECTIONS.json')

        move_files(ruta_source_videos, ruta_dest_videos)
        move_files(ruta_source_images, ruta_dest_images)

        validateExistJson(ruta_json_sections)

        # updateVideosJson(ruta_dest_json, new_json_data)
        update_json(ruta_dest_json, jsonVideos)

        return JsonResponse({"data": "sucessfull"})
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

# NOTE : VALIDAMOS, Y SI NO EXISTE CREAMOS UN JSON NUEVO
def validateExistJson(ruta_json):
    if not os.path.exists(ruta_json):
        # Si no existe, crea el archivo y escribe '[]' en él
        with open(ruta_json, 'w') as file:
            json.dump([], file)


def update_json(ruta_dest_json, new_objects_str):

    validateExistJson(ruta_dest_json)

    # Convierte la cadena new_objects_str a una lista de diccionarios
    new_objects = json.loads(new_objects_str)

    # Abre y lee el archivo JSON existente
    with open(ruta_dest_json, 'r', encoding='utf-8') as archivo:
        datos = json.load(archivo)

    # Agrega los nuevos objetos al principio de la lista
    if isinstance(datos, list):
        datos = new_objects + datos
    else:
        raise ValueError("La estructura del JSON no es la esperada")

    # Guarda el JSON actualizado
    with open(ruta_dest_json, 'w', encoding='utf-8') as archivo:
        json.dump(datos, archivo, ensure_ascii=False, indent=4)

    print("Nuevos objetos agregados correctamente")


import shutil
def move_files(source_dir, dest_dir):
    # Verificar si el directorio de destino existe, si no, crearlo
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    # Obtener la lista de archivos en el directorio de origen
    files = os.listdir(source_dir)

    # Mover cada archivo al directorio de destino
    for file_name in files:
        source_file = os.path.join(source_dir, file_name)
        dest_file = os.path.join(dest_dir, file_name)
        shutil.move(source_file, dest_file)


# ANCHOR UN FILTRO QUE AÚN NO SE COMO FUNCIONA
def get_queryset(self):
    pass
# ANCHOR GUARDA LOS VIDEO EN LA BASE DE DATOS
def save_video(video_name, old_name, extension, file_name, code, acronym, images_num, fecha, position):
    new_video = video(video_name=video_name, old_name=old_name, extension=extension, file_name=file_name, code=code, acronimo=acronym, num_images=images_num, fecha=fecha, position=position)
    new_video.save()
# ANCHOR ECRIBE LOS ARCHIVOS EN LA CARPETA TEMPORAL
def write_file(file_name, attach_file, images_num, extension, images_list):
    # NOTE : ESCRIBIMOS EL VIDEO

    ruta = os.path.join(settings.BASE_DIR, f'static/app_video_processor/tmp/videos/{file_name}-i{images_num}{extension}')

    with open(ruta, 'wb') as f:
        for chunk in attach_file.chunks():
            f.write(chunk)
    # NOTE : ESCRIBIMOS LAS IMAGESNES
    i = 0
    for imgcapture in images_list:
        i += 1
        if imgcapture is None:
            print('No hay imagen')
        else:
            img_data = imgcapture.replace('data:image/jpeg;base64,', '')  # Eliminar el prefijo
            img_data = base64.b64decode(img_data)  # Decodificar los datos con base64
            img = Image.open(io.BytesIO(img_data))  # Crear una imagen PIL a partir de los datos
            img.save(f'static/app_video_processor/tmp/images/{file_name}-{i}.png', 'PNG') # Guardar la imagen en formato PNG
            # with open(f'static/tmp/images/{file_name}-{i}.png', 'wb') as f:
            #     f.write(img_data)
# ANCHOR ELIMINA TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
def delete_file(item):
    if item is None:
        # NOTE : ELIMINAR TODOS LOS VIDEOS
        file_list = glob.glob('/static/app_video_processor/tmp/videos/*') # OBTENER TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
        for file_path in file_list:
            os.remove(file_path)
        # NOTE : ELIMINAR TODOS LOS IMAGES
        file_list = glob.glob('/static/app_video_processor/tmp/images/*') # OBTENER TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
        for file_path in file_list:
            os.remove(file_path)
    else:
        # NOTE : ELIMINAR UN VIDEO
        directory = '/static/app_video_processor/tmp/videos/'
        files = os.listdir(directory) # ENLISTAMOS TODOS LOS ARCHIVOS DE LA CARPETA TEMPORAL
        for file in files:
            if item+'_' in file: # BUSCAMOS EL ARCHIVO QUE CONTENGA EL NUMERO DE ITEM ejem: 1_
                path = f'{directory}{file}'
                os.remove(path)
                break
