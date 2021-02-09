import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { CoursesModule } from './courses/courses.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_HOST
    ),
    CourseModule,
    // CoursesModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
