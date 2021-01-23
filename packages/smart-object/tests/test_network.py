from pytest_mock import MockFixture

from app.network import fetch_broker_config, mqtt_client_factory, BrokerConfig
from app.config import Config, DEVELOPMENT


def test_mqtt_client_factory(mocker: MockFixture):
    mocker.patch('app.network.Client')

    broker_config = BrokerConfig(
        uri='test.com',
        port=1223,
        user='test',
        password='test'
    )
    client = mqtt_client_factory(broker_config)

    assert client.tls_set.called
    assert client.username_pw_set.called
    assert client.username_pw_set.call_args.args == (broker_config.user, broker_config.password)
    assert client.connect.called
    assert client.connect.call_args.args == (broker_config.uri, broker_config.port, broker_config.keep_alive)


def test_fetch_broker_config(mocker: MockFixture):
    app_config = Config(
        env=DEVELOPMENT,
        api_url='http://localhost:3000',
        api_email='test',
        api_password='pass123',
        broker_uri='test.xyz',
        broker_port=1234
    )

    token = 'test-token'
    login_response = mocker.Mock()
    login_response.json.return_value = {'token': token}
    mocker.patch('requests.post', return_value=login_response)

    broker_user = 'test_user'
    broker_password = 'test_password'
    broker_response = mocker.Mock()
    broker_response.json.return_value = {'user': broker_user, 'password': broker_password}
    mocker.patch("requests.get", return_value=broker_response)

    broker_config = fetch_broker_config(app_config)

    assert broker_config.uri == app_config.broker_uri
    assert broker_config.port == app_config.broker_port
    assert broker_config.user == broker_user
    assert broker_config.password == broker_password
