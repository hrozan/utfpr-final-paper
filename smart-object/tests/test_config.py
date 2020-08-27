import os

from pytest_mock import MockFixture

from app.config import get_config, DevelopmentConfig, ProductionConfig, PRODUCTION, DEVELOPMENT


def test_get_config_in_development():
    app_config = get_config()

    assert app_config.env == DEVELOPMENT
    assert isinstance(app_config, DevelopmentConfig)


def test_get_config_in_production(mocker: MockFixture):
    mocked_environ = {
        'ENV': 'PROD',
        'API_URL': 'http://test.com',
        'API_EMAIL': 'test@email.com',
        'API_PASSWORD': 'pass123',
        'BROKER_URI': 'broker.com',
        'BROKER_PORT': '1232'
    }
    mocker.patch.dict(os.environ, mocked_environ)

    app_config = get_config()

    assert app_config.env == PRODUCTION
    assert isinstance(app_config, ProductionConfig)
