import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  readonly name: string;

  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Min 4 symbols, max 16 symbols' })
  readonly password: string;
}
