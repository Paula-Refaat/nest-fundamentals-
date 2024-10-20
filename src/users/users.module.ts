import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { APP_NAME, USER_HABITS } from './user.constant';
class MockUserService {
  findUsers() {
    return ['test'];
  }
}

abstract class ConfigService {}
class DevelopmentConfigService extends ConfigService {}
class ProductionConfigService extends ConfigService {}

@Injectable()
class UserHabitsFactory {
  getHabits() {
    return ['eat', 'sleep', 'work'];
  }
}
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UserHabitsFactory,
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
      provide: APP_NAME, // Token
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
    {
      provide: USER_HABITS,
      useFactory: (userHabits: UserHabitsFactory) => userHabits.getHabits(), // Factory function
      inject: [UserHabitsFactory], // Dependency injection
    },
  ],
})
export class UserModule {}
