import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class CommonModule {}
