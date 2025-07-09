// Profile.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#F3F5F7',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 34,
    zIndex: 10,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  backIcon: {
    width: 30,
    height: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Merriweather-Bold',
    color: '#1B2A49',
  },
});

export default styles;
