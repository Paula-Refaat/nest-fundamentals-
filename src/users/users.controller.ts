import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  LoggerService,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { CustomValidationPipe } from './pipes/validation.pip';
import { UserService } from './user.service';
import { UserResponseDto } from './dtos/user-response.dto';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
interface EnvironmentVariables {
  PORT: number;
  EMAIL: string;
}
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('user')
export class UsersController {
  logger: Logger = new Logger(UsersController.name);
  constructor(
    private readonly userService: UserService,
    private readonly configServices: ConfigService<EnvironmentVariables>,
  ) {
    console.log(process.env.DATA_BASE);
    console.log(this.configServices.get('EMAIL', { infer: true }));
  }

  // @SetMetadata('Is_Public', true)
  @Public()
  @Get()
  find(@Req() req: Request): Promise<UserEntity[]> {
    console.log(req.body);
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.userService.findUsers()), 5000);
    });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): UserResponseDto {
    this.logger.log('get specific user');
    this.logger.debug('get specific user');

    return this.userService.findUserById(id);
  }

  @Post()
  create(@Body() userData: CreateUserDto): UserResponseDto {
    return this.userService.createUser(userData);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateUserDto,
  ): UserEntity {
    return this.userService.updateUser(id, input);
  }
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
