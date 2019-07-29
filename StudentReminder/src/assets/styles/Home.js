import { StyleSheet, Platform } from 'react-native';

// IOS
const ios = StyleSheet.create({
  map: {
    flex: 1,
  },
  settingSignOut: {
    paddingTop: 10,
  },
  tabItem: {
    color: '#f0ad4e'
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  },
  cardItemHours: {
    alignItems: 'center'
  },
  cardTeacher: {
    fontStyle: 'italic',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  mapLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Platform.select({
  ios
})