import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Freezepipe } from './pipes/freeze.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

 @Get ('error')
 throwError (){
  throw new InternalServerErrorException();
 }
}
