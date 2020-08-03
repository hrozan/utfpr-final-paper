import psutil
import json


def get_system_data_json():
    cpu_percent = psutil.cpu_percent()
    memory_percent = psutil.virtual_memory().percent
    return json.dumps({'cpu': cpu_percent, 'memory': memory_percent})
