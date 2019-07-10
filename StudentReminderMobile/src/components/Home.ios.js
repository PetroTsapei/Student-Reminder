import React, { useContext } from 'react';
import { 
  Container, 
  Content, 
  Footer, 
  FooterTab, 
  Button, 
  Icon, 
  Text, 
  Body,
  Header,
  Title
} from 'native-base';
import MapView from 'react-native-maps';
import { RootStoreContext } from '../stores/RootStore';

import styles from '../assets/styles/Home';

export const Home = ({ history }) => {
  const rootStore = useContext(RootStoreContext);

  const goTo = path => history.push(path);
  const isActive = path => history.location.pathname === path;
  const onSignOut = () => {
    rootStore.authStore.signOut();
    history.push('/');
  }

  pages = () => {
    switch(history.location.pathname) {
      case '/': return (
        <MapView 
          showsUserLocation={true}
          style={styles.map}
        />
      )
      case '/:settings': return (
        <>
          <Header>
            <Body>
              <Title>
                Settings
              </Title>
            </Body>
          </Header>
          <Content>
            <Button full danger style={styles.settingSignOut} onPress={onSignOut}>
              <Text>Sign Out</Text>
            </Button>
          </Content>
        </>
      )
    }
  }

  return (
    <Container>
        { pages() }
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon type="MaterialIcons" name="schedule" />
              <Text>Lessons</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button 
              vertical 
              active={isActive('/')} 
              onPress={() => goTo('/')}
            >
              <Icon 
                active={isActive('/')}
                name="navigate"
              />
              <Text>Map</Text>
            </Button>
            <Button 
              vertical 
              onPress={() => goTo('/:settings')}
              active={isActive('/:settings')}
            >
              <Icon 
                name="settings" 
                active={isActive('/:settings')}
              />
              <Text>Settings</Text>
            </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}