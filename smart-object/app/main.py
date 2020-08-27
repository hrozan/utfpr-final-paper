import logging
import json
import time

from config import get_config, DEVELOPMENT
from network import mqtt_client_factory, fetch_broker_config
from system import get_system_information


def main():
    app_config = get_config()
    print("🚀 Starting Application")

    if app_config.env == DEVELOPMENT:
        print("👷 Running in Development")
        logging.basicConfig(level=logging.DEBUG)

    broker_config = fetch_broker_config(app_config)
    client = mqtt_client_factory(broker_config)

    while True:
        payload = get_system_information()

        client.publish("system/data", json.dumps(payload))
        logging.info("Published in system/data: %s", payload)

        time.sleep(2)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        logging.info("Exit Gracefully")
        exit(0)
