import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonRepository {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  async getPokemons(
    limit: number,
    offset: number,
  ): Promise<{ count: number; results: Pokemon[] }> {
    const response = await axios.get(
      `${this.apiUrl}?limit=${limit}&offset=${offset}`,
    );
    const { count, results } = response.data;

    const pokemons = await Promise.all(
      results.map(async (pokemon: any) => {
        const pokemonData = await axios.get(pokemon.url);
        return new Pokemon(
          pokemonData.data.name,
          pokemonData.data.sprites.front_default,
        );
      }),
    );

    return { count, results: pokemons };
  }
}
