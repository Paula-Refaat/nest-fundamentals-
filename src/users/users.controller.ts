import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { CustomValidationPipe } from './pipes/validation.pip';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('user')
export class UsersController {
  private users: UserEntity[] = [];
  @Get()
  find(
    @Query('username', CustomValidationPipe) username: string,
  ): UserEntity[] {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity {
    return this.users.find((user) => user.id === id);
  }

  @Post()
  create(@Body() userData: CreateUserDto): UserEntity {
    // DTO => Data Transfer Object
    const newUser = {
      ...userData,
      id: uuid(),
    };
    this.users.push(newUser);
    return newUser;
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateUserDto,
  ): UserEntity {
    const user = this.users.findIndex((user) => user.id === id);
    this.users[user] = { ...this.users[user], ...input };
    return this.users[user];
  }
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.users = this.users.filter((user: UserEntity) => user.id !== id);
  }
}
