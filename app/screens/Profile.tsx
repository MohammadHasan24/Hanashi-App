// Profile.tsx
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/Profile.styles';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Image
          source={require('../../assets/back-button-icon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.heading}>Your Profile</Text>
      </View>
    </View>
  );
}
