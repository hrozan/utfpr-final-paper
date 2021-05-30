import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';

const isTest = process.env.NODE_ENV === 'test';

const dbCredential = isTest ? 'FinalPaperTest' : 'FinalPaper';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: isTest ? 5443 : 5442,
      username: dbCredential,
      password: dbCredential,
      database: dbCredential,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
