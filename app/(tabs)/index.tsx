import { LogBox, View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../src/api/tmdb';
LogBox.ignoreLogs([
  'Invalid prop `style` supplied to `React.Fragment`',
]);
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}


export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
      setLoading(false);
    };
    loadMovies();
  }, []);

  const renderItem = ({ item }: { item: Movie }) => (
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
        <ActivityIndicator size="large" color="#00BFFF" />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#351c1cff', borderColor: '#c26d78ff', borderWidth: 2, borderRadius: 10 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' , borderColor: '#f2f6f7ff', borderBottomWidth: 2, paddingBottom: 10, fontFamily: 'georgia'},
  row: { justifyContent: 'space-between'},
  card: { marginBottom: 16, flex: 1, marginHorizontal: 4, borderColor: '#f2f6f7ff', borderWidth: 1, borderRadius: 10, overflow: 'hidden' },
  poster: { width: '100%', height: 250, borderRadius: 10 },
  title: { color: '#fff', textAlign: 'center', marginTop: 8 }
});
