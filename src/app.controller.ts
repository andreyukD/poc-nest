import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {BaseService} from "./base.service";
import {UpdatesGateway} from "./updates.gateway";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly baseService: BaseService<any>,
              private readonly gateway: UpdatesGateway
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return await this.baseService.getById(id)
  }

  @Post('create')
  async createUser(@Body() data: any) {
    return await this.baseService.create(data);
  }

  @Post('update/:id')
  async updateUser(@Param('id') id: string) {
    const user = await this.baseService.update(id);
    this.gateway.sendUpdate('update', user);
    return user
  }
}
