import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/TrendingSection.styles';
import BookCard from './BookCard';

const baseBooks = [
  {
    id: 1,
    cover: require('../assets/ex-book-pic-1.png'),
    title: 'Ocean Calls',
    author: 'A. Author',
  },
  {
    id: 2,
    cover: require('../assets/ex-book-pic-2.png'),
    title: 'Sky Bound',
    author: 'B. Writer',
  },
  {
    id: 3,
    cover: require('../assets/ex-book-pic-3.png'),
    title: 'Moon Tales',
    author: 'C. Teller',
  },
];

// Duplicate and shuffle
const books = shuffleArray([...baseBooks, ...baseBooks]);

// Shuffle helper
function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function TrendingSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Trending</Text>
      <View style={styles.cardContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {books.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              index={index}
              total={books.length}
              onPress={() => console.log(`Pressed Book ID: ${book.id}`)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
