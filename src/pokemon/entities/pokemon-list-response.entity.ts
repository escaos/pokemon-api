import { ApiProperty } from '@nestjs/swagger';
import { Pokemon } from './pokemon.entity';

export class PokemonListResponse {
  @ApiProperty({
    description: 'Total number of resources available from this API.',
  })
  count: number;

  @ApiProperty({
    description: 'The URL for the next page in the list.',
    required: false,
    nullable: true,
  })
  next: string | null;

  @ApiProperty({
    description: 'The URL for the previous page in the list.',
    required: false,
    nullable: true,
  })
  previous: string | null;

  @ApiProperty({ description: 'A list of Pokemon.', type: [Pokemon] })
  results: Pokemon[];

  constructor(
    count: number,
    next: string | null,
    previous: string | null,
    results: Pokemon[],
  ) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }
}
