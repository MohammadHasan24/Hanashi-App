import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    width: 140,
    marginLeft: -20,
  },
  cardSpacing: {
    marginRight: 50,
  },
  image: {
    width: 164,
    height: 116,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginTop: 0, 
  },
  title: {
    fontSize: 16,
    fontFamily: 'Merriweather-Bold',
    color: '#1E3245',
    lineHeight: 20,
    letterSpacing: -0.2,
    marginTop: 5, 
    marginLeft: 5,
  },
  author: {
    fontSize: 13,
    fontFamily: 'Merriweather-Italic',
    fontWeight: '400',
    color: '#84909C',
    marginBottom: 20, 
    marginTop: 2, 
    lineHeight: 18,
    marginLeft: 7,
  },
  divider: {
    height: 4,
    width: 164,
    backgroundColor: '#C8C8C8', // grey color like Figma
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

});

export default styles;
