// imports
import { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ReaderScreen() {
  const { id } = useLocalSearchParams();
  const [chapter, setChapter] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  const loadChapterById = async (storyId: string, chapterId: string) => {
    try {
      const chapterDoc = await getDoc(doc(db, 'stories', storyId, 'chapters', chapterId));
      if (chapterDoc.exists()) {
        setChapter({ id: chapterDoc.id, ...chapterDoc.data() });
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      } else {
        console.warn('❌ Chapter not found');
        setChapter(null);
      }
    } catch (err) {
      console.error('❌ Error loading chapter by ID:', err);
    }
  };

  useEffect(() => {
    const fetchFirstChapter = async () => {
      try {
        const storyDoc = await getDoc(doc(db, 'stories', id as string));
        const startChapterId = storyDoc.data()?.startChapterId;

        if (startChapterId) {
          await loadChapterById(id as string, startChapterId);
        } else {
          const chaptersRef = collection(db, 'stories', id as string, 'chapters');
          const snapshot = await getDocs(chaptersRef);
          const chapters = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          if (chapters.length === 0) {
            console.warn('❌ No chapters found');
            setChapter(null);
          } else {
            setChapter(chapters[0]);
          }
        }
      } catch (err) {
        console.error('❌ Error fetching chapter:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstChapter();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!chapter) {
    return (
      <View style={styles.centered}>
        <Text>No chapter found.</Text>
      </View>
    );
  }

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        {chapter.title?.trim() && (
          <Text style={styles.chapterTitle}>{chapter.title.trim()}</Text>
        )}

        <View style={styles.textContent}>
          {Array.isArray(chapter.body) && chapter.body.length > 0 ? (
            chapter.body.map((paragraph: any, index: number) => (
              <Text key={index} style={styles.paragraph}>
                {typeof paragraph === 'string' ? paragraph.trim() : ''}
              </Text>
            ))
          ) : (
            <Text style={styles.paragraph}>No content available.</Text>
          )}
        </View>

        {Array.isArray(chapter.options) && chapter.options.length > 0 && (
          <View style={styles.choiceContainer}>
            {chapter.options.map((opt: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.choiceButton}
                onPress={() => {
                  if (opt.nextChapterId) {
                    loadChapterById(id as string, opt.nextChapterId);
                  }
                }}
              >
                <Text style={styles.choiceText}>{(opt.text || '').trim()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  chapterTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 44,
  },
  textContent: {
    marginBottom: 32,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  choiceContainer: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  choiceButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  choiceText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
