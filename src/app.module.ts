import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type:'mysql',
        host:'localhost',
        port:3306,
        username:'nest',
        password:'password',
        database:'nest',
        synchronize:true,
        entities: [__dirname + '/**/*.entity{.ts,.js}']
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
