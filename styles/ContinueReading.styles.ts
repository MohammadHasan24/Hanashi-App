import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  section: {
    marginTop: 30,
    width: 345,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Merriweather-Bold',
    letterSpacing: 0,
    marginBottom: 6,
    color: '#84909C',
    paddingHorizontal: 24,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.32,
    color: '#fff',
  },
  chapter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: -0.32,
    color: '#fff',
    marginTop: 8,
  },
});

export default styles;
