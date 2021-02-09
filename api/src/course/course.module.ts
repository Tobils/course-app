import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CoursesSchema } from 'src/models/courses.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Course.name,
        schema: CoursesSchema
      }
    ])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
