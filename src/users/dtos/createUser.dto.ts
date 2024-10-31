import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' })
  readonly username: string;

  @IsEmail({}, { message: 'Email is not valid' })
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly country: string;
}
