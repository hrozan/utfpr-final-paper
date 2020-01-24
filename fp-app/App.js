/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Container, Text, Header, Footer, Body, Button, FooterTab} from 'native-base';

const App: () => React$Node = () => {
  return (
    <Container>
      <Header />
      <Body>
        <Text>Higor Augusto Rozan</Text>
      </Body>
      <Footer>
        <FooterTab>
          <Button >
            <Text>Connect</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default App;
