import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/ContinueReading.styles';

export default function ContinueReading() {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Continue Reading</Text>
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.8} 
        onPress={() => {
          console.log('Continue reading pressed');
        }}
      >
        <LinearGradient
          colors={['#F49007', '#BBCADB', '#1686AE']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.title}>Deep in the Ocean</Text>
          <Text style={styles.chapter}>Chapter 3 • 63%</Text> 
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
