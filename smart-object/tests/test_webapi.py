from app.config import ApiConfig
from app.messenger import create_messenger_client, MessengerConfig, BrokerCredentials
from app.webapi import create_api_service
from tests.mock import MockResponse


def test_create_api_service_successfully(mocker):
    token = "test-token"
    mock_response = MockResponse(body={'token': token})
    mocker.patch('requests.post', return_value=mock_response)
    api_config = ApiConfig("http://localhost:3000", "higor@email.com", "pass123")

    api_service = create_api_service(api_config)

    assert api_service.token == token


def test_create_messenger_client(mocker):
    mocked_client = mocker.patch("app.messenger.Client")

    messenger_config = MessengerConfig(broker_uri="test.com", port=8883)
    credentials = BrokerCredentials(user="test", password="test123")

    client = create_messenger_client(messenger_config, credentials)

    assert mocked_client.return_value == client
    # assert mocked_client.mock_calls[1] == call.tls_set()
