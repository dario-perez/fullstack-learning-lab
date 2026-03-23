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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<TarotService>, // Usamos Partial temporalmente
  ) {
    return this.appService.updateService(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
