import os

DEVELOPMENT = "DEV"
PRODUCTION = "PROD"


class Config:
    def __init__(self, env: str, api_url: str, api_email: str, api_password: str, broker_uri: str, broker_port: int):
        self.env = env
        self.broker_port = broker_port
        self.broker_uri = broker_uri
        self.api_url = api_url
        self.api_email = api_email
        self.api_password = api_password


class DevelopmentConfig(Config):
    def __init__(self):
        super().__init__(
            env=DEVELOPMENT,
            api_url='http://localhost:3000',
            api_email='higor@email.com',
            api_password='pass123',
            broker_uri='hrozan.xyz',
            broker_port=8883
        )


class ProductionConfig(Config):
    def __init__(self):
        super().__init__(
            env=PRODUCTION,
            api_url=os.environ.get('API_URL'),
            api_email=os.environ.get('API_EMAIL'),
            api_password=os.environ.get('API_PASSWORD'),
            broker_uri=os.environ.get('BROKER_URI'),
            broker_port=int(os.environ.get('BROKER_PORT'))
        )


def get_config() -> Config:
    env = os.environ.get("ENV")

    if env != PRODUCTION:
        return DevelopmentConfig()

    return ProductionConfig()
