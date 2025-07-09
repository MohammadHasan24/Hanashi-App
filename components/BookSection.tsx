// components/BookSection.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { collection, getDocs, query, Query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import BookCard from './BookCard';
import styles from '../styles/BookSection.styles';

type Story = {
  title: string;
  description?: string;
  tags?: string[];
  chapters?: any[];
  coverImage?: string;
  published?: boolean;
  createdAt?: any;
};

type Book = {
  id: string;
  title: string;
  cover: string;
  description?: string;
  tags?: string[];
};

type Props = {
  title: string;
  filter?: (baseQuery: Query) => Query;
};

export default function BookSection({ title, filter }: Props) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseQuery = query(collection(db, 'stories'));
        const q = filter ? filter(baseQuery) : baseQuery;

        const snapshot = await getDocs(q);

        const results = snapshot.docs.map((doc) => {
          const data = doc.data() as Story;
          return {
            id: doc.id,
            title: data.title,
            cover: data.coverImage || '',
            description: data.description || '',
            tags: data.tags || [],
          };
        });

        setBooks(results);
      } catch (err) {
        console.error(`Error loading ${title} books:`, err);
      }
    };

    fetchBooks();
  }, [filter, title]);

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {books.length === 0 ? (
        <Text style={{ padding: 16, fontStyle: 'italic' }}>No books found.</Text>
      ) : (
        <View style={styles.cardContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {books.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                index={index}
                total={books.length}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
