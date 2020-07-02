import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [start, setStart] = useState(false);
  let interval;
  useEffect(() => {
    if(start === true) {
        interval = setInterval(() => {
          setProgress(progress => progress + 1);
        }, 1000);
        return () => clearInterval(interval);
    }
  }, [start]);

  useEffect(() => {
    if(progress >= 100) {
      setStart(false);
      clearInterval(interval);
    }
  }, [progress])

  return (
    <View style={styles.container}>
      <Text>{progress}%</Text>
      <StatusBar style="auto" />
      <View style={styles.progressBar}>
        <View style={[styles.loading, { width: `${progress}%` }]}></View>
      </View>
      <Button onPress={() => {setStart(true); setProgress(0);}} title="Start"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    height: 20,
    width: '96%',
    borderRadius: 4,
    borderWidth: 3,
    marginBottom: 20,
  },
  loading: {
    height: 15,
    backgroundColor: 'red',
  }
});
