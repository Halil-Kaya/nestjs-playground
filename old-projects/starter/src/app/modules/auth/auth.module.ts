import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule }     from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IEntvironment } from 'src/app/interfaces/environment.interface';
import { PassportJwtGuard } from './guards/passport-jwt.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { JwtHelper } from './helpers/jwt.helper';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports : [ConfigService],
      useFactory : async(configService : ConfigService<IEntvironment>) => ({
        secret : configService.get<string>('JWT_SECRET')
      }),
      inject : [ConfigService]
    }),
    UserModule

  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PassportJwtGuard,
    PassportLocalGuard,
    JwtHelper],
})
export class AuthModule {}
