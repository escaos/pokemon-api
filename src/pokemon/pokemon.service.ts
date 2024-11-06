import { Injectable } from '@nestjs/common';
import { PokemonRepository } from './pokemon.repository';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  async findAll(
    limit: number,
    offset: number,
  ): Promise<{ count: number; results: Pokemon[] }> {
    return this.pokemonRepository.getPokemons(limit, offset);
  }
}
