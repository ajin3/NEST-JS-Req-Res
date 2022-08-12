import { MiddlewareConsumer, NestModule, Scope } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { RequestService } from './request.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RequestService,

    {
      provide:APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide:APP_INTERCEPTOR,
      scope:Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide:APP_FILTER,
      useClass: HttpExceptionFilter,
    }
    
  
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthenticationMiddleware)
    .forRoutes('*');
  }
}
