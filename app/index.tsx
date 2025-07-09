// imports
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// components
import HomeHeader from '../components/HomeHeader';
import ContinueReading from '../components/ContinueReading';
import BookSection from '../components/BookSection';

// styles
import styles from '../styles/index.styles';

// fonts
export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'Merriweather-Regular': require('../assets/fonts/Merriweather_24pt-Regular.ttf'),
    'Merriweather-Bold': require('../assets/fonts/Merriweather_24pt-Bold.ttf'),
    'Merriweather-Italic': require('../assets/fonts/Merriweather_24pt-Italic.ttf'),
    'WorkSans-Regular': require('../assets/fonts/WorkSans-Regular.ttf'),
  });

  if (!fontsLoaded) return null; // if fonts don't load yet, return null

  return (
    <>
      {/* Clean white status bar with dark content (battery, time, etc.) */}
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />


      <ScrollView
        style={styles.screen}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <HomeHeader />
        <ContinueReading />
        <BookSection title="Recommended" />
        <BookSection title="Trending" />                

                          {/* <BookSection
                                title="New Releases"
                                filter={(q: Query) =>
                                query(q, orderBy('createdAt', 'desc'), where('published', '==', true), limit(5))
                                }     
                                /> */}
        
        <BookSection title="Recommended" />
        <BookSection title="Trending" />
      </ScrollView>
    </>
  );
}
