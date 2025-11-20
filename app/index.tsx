import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name : string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name : string;
    ulr: string;
  }
}

const coloursByType = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

export default function Index() {
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);

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
      
      //fetch detailed info for each pokemon in parallel
      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name : pokemon.name,
            image: details.sprites.front_default, //main sprite
            imageBack: details.sprites.back_default, //main sprite
            types: details.types,
          };
        })
      )
      setPokemon(detailedPokemon);
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map((pokemon) => (
        <View 
          key={pokemon.name} 
          style={{
            // @ts-ignore
            backgroundColor: coloursByType[pokemon.types[0].type.name] + 20,
            padding: 20,
            borderRadius: 20
          }}
        >
          <Text style={styles.name}>{pokemon.name}</Text>
          {pokemon.types.map((pokemonType) => (
              <View key={pokemonType.type.name}>
                <Text style={styles.type}>{pokemonType.type.name}</Text> 
              </View>
              // <Text>{pokemon.types[0].type.name}</Text> old versio for one only
          ))}
        
          <View style={{
            flexDirection: "row"
          }}>
            <Image 
            source={{uri: pokemon.image}}
            style={{ width: 150, height: 150}}
          />
          <Image 
            source={{uri: pokemon.imageBack}}
            style={{ width: 150, height: 150}}
          />
          </View>
          
        </View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center'
  },
  type: {
    fontSize: 20,
    color: "gray",
  },
});