import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;

  @Expose({ name: 'country_name' })
  country: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
