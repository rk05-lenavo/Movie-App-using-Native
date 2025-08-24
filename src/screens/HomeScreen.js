import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchPopularMovies } from '../api/tmdb';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
      setLoading(false);
    };

    loadMovies();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Movies 🎬</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#b45454ff" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  row: { justifyContent: 'space-between' },
  card: { marginBottom: 16, flex: 1, marginHorizontal: 4 },
  poster: { width: '100%', height: 250, borderRadius: 10 },
  title: { color: '#fff', textAlign: 'center', marginTop: 8 }
});

export default HomeScreen;
