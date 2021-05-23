import 'should';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserRequest } from '../src/users/user.request';
import { Repository } from 'typeorm';
import { User } from '../src/users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('/users', () => {
  let userRepository: Repository<User>;
  let server: any;
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    console.log('init');
    // userRepository = moduleFixture.get<Repository<User>>(
    //   getRepositoryToken(User),
    // );
  });

  afterEach(async () => {
    await app.close();
    console.log('down');
  });

  describe('POST', () => {
    let payload: UserRequest;

    beforeEach(() => {
      payload = {
        userName: 'hrozan',
        email: 'higorb.rozan@gmail.com',
        password: 'pass123',
      };
    });

    it('should return CREATED', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(HttpStatus.CREATED);

      console.log(response.body);
      // response.status.should.be.equal(HttpStatus.CREATED);
    });

    // it('should return a id', async () => {
    //   payload.userName = 'test2';
    //
    //   const response = await request(server).post('/users').send(payload);
    //
    //   response.body.id.should.not.be.Null();
    // });
  });
});
