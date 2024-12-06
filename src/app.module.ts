import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./user.model";
import {BaseService} from "./base.service";
import {UpdatesGateway} from "./updates.gateway";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-reactive'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, BaseService, UpdatesGateway],
  exports: [BaseService]
})
export class AppModule {}
