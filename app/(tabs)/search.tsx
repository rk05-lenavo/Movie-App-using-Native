import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = 'f438648e8cd3fb324fcafe9ce59c584a'; // Paste your key here

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then((response) => {
          setResults(response.data.results);
        })
        .catch((error) => console.error('Search Error:', error))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#999" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  input: {
    backgroundColor: '#1c1c1e',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  card: { marginBottom: 20, alignItems: 'center' },
  image: { width: 200, height: 300, borderRadius: 10 },
  title: { color: '#fff', fontSize: 16, marginTop: 10, textAlign: 'center' },
});
