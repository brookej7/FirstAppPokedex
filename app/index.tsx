import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  const [pokemons, setPokemon] = useState([]);

  useEffect(() => {
    // fetch pokemon
    fetchPokemon();
  }, [])

  async function fetchPokemon() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=30"
      );
      const data = await response.json();

      setPokemon(data.results);
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
