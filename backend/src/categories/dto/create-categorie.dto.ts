import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieDto {
  @ApiProperty({
    description: 'Le nom de la catégorie',
    example: 'Électronique',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Le nom de la catégorie ne peut pas être vide' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s-]+$/, {
    message:
      'Le nom ne peut contenir que des lettres, chiffres, espaces et tirets',
  })
  nom: string;
}
