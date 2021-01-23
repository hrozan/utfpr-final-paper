import logging

from paho.mqtt.client import MQTTMessage

from app.config import get_config, DEVELOPMENT
from app.network import mqtt_client_factory, fetch_broker_config


def main():
    app_config = get_config()
    print("🚀 Client Application")

    if app_config.env == DEVELOPMENT:
        print("👷 Running in Development")
        logging.basicConfig(level=logging.DEBUG)

    broker_config = fetch_broker_config(app_config)
    client = mqtt_client_factory(broker_config)

    def on_message(_, __, message: MQTTMessage):
        print(message.payload.decode('utf8'))

    client.on_message = on_message

    client.subscribe("system/data")
    client.loop_forever()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        logging.info("Exit Gracefully")
        exit(0)
