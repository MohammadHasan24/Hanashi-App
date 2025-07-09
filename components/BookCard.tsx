// components/BookCard.tsx
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/BookCard.styles';

type Book = {
  id: string;
  title: string;
  cover?: string;
  description?: string;
  tags?: string[];
};

type Props = {
  book: Book;
  index: number;
  total: number;
  onPress?: () => void;
};

export default function BookCard({ book, onPress }: Props) {
  const router = useRouter();
  if (!book) {
    console.warn('❌ Book data is missing');
    return null;
  }

  return (
    <Pressable
      onPress={
        onPress ??
        (() =>
          router.push({
            pathname: `/book/${book.id}`,
            params: {
              id: book.id,
              title: book.title,
              cover: book.cover,
              description: book.description,
              tags: book.tags?.join(',') || '',
            },
          }))
      }
      style={styles.card}
    >
      <Image
        source={{ uri: book.cover }}
        style={styles.image}
        onError={(e) => {
          console.warn('❌ Image load failed:', e.nativeEvent.error);
        }}
      />
      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
    </Pressable>
  );
}
