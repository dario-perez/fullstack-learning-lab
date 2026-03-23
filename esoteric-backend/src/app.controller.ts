import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AppService, TarotService } from './app.service';
import { LogService } from './log.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logService: LogService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // New entry point: http://localhost:3000/services?budget=60000
  @Get('services')
  getServices(
    @Query('budget', ParseIntPipe) budget: number,
    @Query('category') category: string,
  ): TarotService[] {
    return this.appService.getAvailableServices(budget, category);
  }

  @Post('create')
  createNewService(@Body() data: TarotService): string {
    return this.appService.createService(data);
  }

  @Delete('services/:name')
  removeService(@Param('name') name: string): string {
    return this.appService.deleteService(name);
  }

  @Patch('services/:name')
  editService(
    @Param('name') name: string,
    @Body() data: Partial<TarotService>,
  ): string {
    return this.appService.updateService(name, data);
  }
}
