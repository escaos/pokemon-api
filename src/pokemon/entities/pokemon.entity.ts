import { ApiProperty } from '@nestjs/swagger';

export class Pokemon {
  @ApiProperty({
    description: 'The name of the Pokemon',
    example: 'Pikachu',
  })
  name: string;

  @ApiProperty({
    description: "The URL to the Pokemon's image",
    example: 'https://example.com/pikachu.png',
  })
  imageUrl: string;

  constructor(name: string, imageUrl: string) {
    this.name = name;
    this.imageUrl = imageUrl;
  }
}
