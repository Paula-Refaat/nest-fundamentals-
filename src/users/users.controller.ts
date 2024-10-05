import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UsersController {
  @Get()
  find(): string[] {
    return ['John Doe', 'khalled', 'sd'];
  }
  @Get()
  findOne(): string {
    return 'Find one user';
  }

  @Post()
  create(): string {
    return 'create one user';
  }

  @Patch()
  update(): string {
    return 'update one user';
  }
  @Delete()
  delete(): string {
    return 'delete one user';
  }
}
