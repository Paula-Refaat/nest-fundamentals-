import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
class MockUserService {
  findUsers() {
    return ['test'];
  }
}

abstract class ConfigService {}
class DevelopmentConfigService extends ConfigService {}
class ProductionConfigService extends ConfigService {}
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    // standard provider
    {
      provide: UserService,
      useClass: UserService,
    },

    // Custom provider using useValue syntax

    // {
    //   provide: UserService,
    //   useValue: new MockUserService(),
    // },
    {
      provide: 'APP_NAME', // Token
      useValue: 'Nest Demo API', // Value
    },
    // custom provider using useClass syntax
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
})
export class UserModule {}
