import { AuthController } from './controller/auth.controller';

import { AuthService } from './services/auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportJwtGuard } from './guards/passport-jwt.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';

import { ConfigService } from '@nestjs/config';
import { IEnvironment } from 'src/app/interfaces/environment.interface';
import { JwtHelper } from './helpers/jwt.helper';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigService],
      useFactory: async (configService: ConfigService<IEnvironment>) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PassportJwtGuard, PassportLocalGuard, JwtHelper],
})
export class AuthModule {}
