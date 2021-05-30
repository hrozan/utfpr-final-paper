import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRequest } from './user.request';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMapper } from './user.mapper';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mapper: UserMapper,
  ) {}

  @Post()
  async create(@Body() userRequest: UserRequest) {
    this.logger.log(`Start creating ${userRequest.userName}`);
    const user = this.mapper.toUser(userRequest);

    await this.userRepository.save(user);
    this.logger.log(`User ${user.id} created `);
    return { id: user.id };
  }

  @Get(':id')
  async read(@Param(':id') id: string) {
    const user = await this.userRepository.findOne(id);
    return this.mapper.toDto(user);
  }
}
