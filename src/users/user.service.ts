import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  findUsers(): UserEntity[] {
    return this.users;
  }

  findUserById(id: string): UserEntity {
    return this.users.find((user) => user.id === id);
  }
  createUser(userData: CreateUserDto): UserEntity {
    const newUser = {
      ...userData,
      id: uuid(),
    };
    this.users.push(newUser);
    return newUser;
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
