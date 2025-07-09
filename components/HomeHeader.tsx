import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/HomeHeader.styles';

export default function HomeHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hanashi !</Text>
      <TouchableOpacity activeOpacity={0.65} onPress={() => router.push('/screens/Profile')}>
        <Image
          source={require('../assets/ex-profile-pic.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
}
