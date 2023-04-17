import { Injectable,Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../admin/user/user.service';
import { User } from '../../admin/user/entities/user.entity';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(
    username: string,
    password: string,
  ): Promise<any>  {
    
    this.logger.log("validateUser----------------------->" + username);
    const existUser = await this.userService.findByUsername(username);
    
    if (!existUser) {
      return null;
    }

    this.logger.log("对比----------------------->" + existUser.nickname +  + existUser.create_time + "--|-" + existUser.id + "|" + existUser.password + "|" + password);


    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return null;
    }

    const { password: ignorePass, ...restUser } = existUser;

    return restUser;
  }

  async login(user: User) {
    this.logger.log("login----------begin------------->");
    const { password, ...restUser } = user;
    this.logger.log("login----------------------->" + user.username);
    const payload = { ...restUser, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      user: restUser,
      expiresIn: jwtConstants.expiresIn,
    };
  }
}
