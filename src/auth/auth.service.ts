import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    if (
      username !== this.configService.get('AUTH_USERNAME') ||
      password !== this.configService.get('AUTH_PASSWORD')
    )
      throw new UnauthorizedException();

    return {
      access_token: this.jwtService.sign({ username }),
      token_type: 'bearer',
    };
  }
}
