from unittest.mock import Mock

from app.config import ApiConfig
from app.messenger import create_messenger_client, MessengerConfig, BrokerCredentials
from app.webapi import create_api_service


def test_create_api_service_successfully(mocker):
    token = "test-token"
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {'token': token}

    mocker.patch('requests.post', return_value=mock_response)
    api_config = ApiConfig("http://localhost:3000", "higor@email.com", "pass123")

    api_service = create_api_service(api_config)

    assert api_service.token == token
    assert mock_response.json.called


def test_create_messenger_client(mocker):
    mocked_client = mocker.patch("app.messenger.Client")

    messenger_config = MessengerConfig(broker_uri="test.com", port=8883)
    credentials = BrokerCredentials(user="test", password="test123")

    client = create_messenger_client(messenger_config, credentials)

    assert mocked_client.return_value == client
    assert client.tls_set.called
    assert client.username_pw_set.called
    assert client.connect.called

