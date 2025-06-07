import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    // IMPORTANT: Check if the secret is actually defined
    if (!jwtSecret) {
      // It's critical for your application to fail loudly if this secret is missing
      throw new InternalServerErrorException('JWT_SECRET is not defined in environment variables.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Don't ignore token expiration
      secretOrKey: jwtSecret, // Now TypeScript knows this is definitely a string
    });
  }

  async validate(payload: any) {
    // payload contains the decoded JWT payload
    const user = await this.userService.findOneById(payload.sub); // 'sub' is typically the user ID
    if (!user) {
      throw new UnauthorizedException();
    }
    // The validated user object will be attached to the request (req.user)
    return user;
  }
}