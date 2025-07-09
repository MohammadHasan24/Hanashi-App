import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 65,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 30,
    fontWeight: '500',
    fontFamily: 'Merriweather-Bold',
    color: '#1B2A49',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 3,
    marginTop: 1,
  },
});

export default styles;
