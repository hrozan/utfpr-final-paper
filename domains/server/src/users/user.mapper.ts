import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRequest } from './user.request';

@Injectable()
export class UserMapper {
  toUser(request: UserRequest): User {
    return {
      userName: request.userName,
      email: request.email,
      password: request.password,
    };
  }
}
