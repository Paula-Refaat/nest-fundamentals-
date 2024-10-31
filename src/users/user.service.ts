import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { APP_NAME, LoggerServiceAlias, USER_HABITS } from './user.constant';
import { UserResponseDto } from './dtos/user-response.dto';
@Injectable()
export class UserService {
  constructor(
    @Inject(APP_NAME) private appName: String,
    @Inject(USER_HABITS) private userHabits: String[],
    @Inject(LoggerServiceAlias) private logger,
  ) {}

  private users: UserEntity[] = [];

  findUsers(): UserEntity[] {
    // console.log(this.appName);
    // console.log(this.userHabits);
    // console.log(this.logger);

    return this.users;
  }

  findUserById(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    return new UserResponseDto(user);
  }
  createUser(userData: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      ...userData,
      id: uuid(),
    };
    this.users.push(newUser);
    return new UserResponseDto(newUser);
  }
  updateUser(id: string, input: UpdateUserDto): UserEntity {
    const user = this.users.findIndex((user) => user.id === id);
    this.users[user] = { ...this.users[user], ...input };
    return this.users[user];
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user: UserEntity) => user.id !== id);
  }
}
