import psutil


def get_system_information():
    cpu_percent = psutil.cpu_percent()
    memory_percent = psutil.virtual_memory().percent
    return {'cpu': cpu_percent, 'memory': memory_percent}
