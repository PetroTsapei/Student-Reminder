import React, { useContext, useState, useEffect } from 'react';
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
import { Image, Alert } from 'react-native';
import { Lessons } from '../components/Lessons';
import College from '../assets/images/college.png';
import MapView, { Marker } from 'react-native-maps';
import { RootStoreContext } from '../stores/RootStore';

import styles from '../assets/styles/Home';

export const Home = ({ history }) => {
  const rootStore = useContext(RootStoreContext);
  const [initialRegion, setInitialRegion] = useState({});
  const latitude = 48.9430535;
  const longitude = 24.7337011;

  const goTo = path => history.push(path);
  const isActive = path => history.location.pathname === path;
  const onSignOut = () => {
    rootStore.authStore.signOut();
    history.push('/');
  }

  getCurrentLocation = () => {
    // TODO fix it
    navigator.geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 1,
          longitudeDelta: 1
        };

        setInitialRegion(region);
      },
      error => Alert.alert('Error', error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  useEffect(() => getCurrentLocation(), []);

  pages = () => {
    if (Object.keys(initialRegion).length) {
      switch(history.location.pathname) {
        case '/': return (
          <MapView
            showsUserLocation={true}
            followUserLocation={true}
            zoomEnabled={true}
            style={styles.map}
            initialRegion={initialRegion}
          >
            <Marker 
              coordinate={{ longitude, latitude }}
            >
              <Image source={College} style={{ width: 40, height: 40 }} />
            </Marker>
          </MapView>
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
        case '/:lessons': return <Lessons />
      }
    }
  }

  return (
    <Container>
        { pages() }
        <Footer>
          <FooterTab>
            <Button 
              vertical
              active={isActive('/:lessons')}
              onPress={() => goTo('/:lessons')}
            >
              <Icon 
                type="MaterialIcons"
                name="schedule"
                active={isActive('/:lessons')}
              />
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