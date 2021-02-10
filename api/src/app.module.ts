import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { CourseController } from './course/course.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_HOST
    ),
    CourseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  /**
   * 
   * @param consumer middleware 
   */
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
      consumer
        .apply(GetUserMiddleware)
        .forRoutes(
          CourseController, 
          UserController
        )
  }
}
