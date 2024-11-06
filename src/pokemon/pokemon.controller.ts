import { Controller, Get, Query, Req } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonListResponse } from './entities/pokemon-list-response.entity';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a paginated list of Pokemons' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of Pokemons to retrieve',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of Pokemons to skip',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of Pokemons retrieved successfully.',
    type: PokemonListResponse,
  })
  async getPokemons(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
    @Req() request: Request,
  ): Promise<PokemonListResponse> {
    const limitNum = Number(limit);
    const offsetNum = Number(offset);

    const { count, results } = await this.pokemonService.findAll(
      limitNum,
      offsetNum,
    );

    // Compute next and previous offsets
    const nextOffset =
      offsetNum + limitNum < count ? offsetNum + limitNum : null;
    const previousOffset =
      offsetNum - limitNum >= 0 ? offsetNum - limitNum : null;

    // Construct base URL
    const protocol = request.protocol;
    const host = request.get('host'); // e.g., localhost:4000
    const baseUrl = `${protocol}://${host}${request.baseUrl}${request.path}`;

    // Construct next and previous URLs
    const next =
      nextOffset !== null
        ? `${baseUrl}?limit=${limitNum}&offset=${nextOffset}`
        : null;
    const previous =
      previousOffset !== null
        ? `${baseUrl}?limit=${limitNum}&offset=${previousOffset}`
        : null;

    return new PokemonListResponse(count, next, previous, results);
  }
}
