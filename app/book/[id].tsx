// imports
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const BackIcon = require('../../assets/back-button-icon.png');

type Book = {
  title: string;
  coverImage?: string;
  description?: string;
  tags?: string[];
};

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const docRef = doc(db, 'stories', id as string);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setBook({
            title: data.title,
            coverImage: data.coverImage,
            description: data.description,
            tags: data.tags || [],
          });
        } else {
          console.warn('❌ No book found with this ID');
        }
      } catch (err) {
        console.error('❌ Error loading book:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={{ padding: 20, textAlign: 'center' }}>Book not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View>
          {book.coverImage && (
            <Image
              source={{ uri: book.coverImage }}
              style={styles.coverImage}
              onError={(e) => {
                console.warn('❌ Failed to load image:', e.nativeEvent.error);
              }}
            />
          )}

          {/* 🔙 Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Image source={BackIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>Written by Unknown Author</Text>

          <Text style={styles.description}>
            {book.description || 'No description available.'}
          </Text>

          {book.tags?.length > 0 && (
            <View style={styles.tagContainer}>
              {book.tags.map((tag, i) => (
                <Text key={i} style={styles.tag}>#{tag}</Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* 📚 Fixed Start Reading Button */}
      <TouchableOpacity
        style={styles.readButton}
        onPress={() => router.push(`/reader/${id}`)}
      >
        <Text style={styles.readButtonText}>Start Reading</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingBottom: 100, // leave space for fixed button
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 25,
    backgroundColor: '#000', // solid black
    borderRadius: 24,
    padding: 6,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    fontSize: 14,
  },
  readButton: {
    position: 'absolute',
    bottom: 50,
    left: 16,
    right: 16,
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
  },
  readButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
