import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { coursesDocument } from 'src/models/courses.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
    private logger = new Logger('course-service')

    @InjectModel('Course')
    private courseModel: Model<coursesDocument>

  async create(course: CreateCourseDto): Promise<Course> {
    this.logger.log(`This action adds a new course \n ${course} \n`);
    const newCourse = new this.courseModel(course);
    await newCourse.save();
    return newCourse.toObject({versionKey:false});
  }

  async findAll(): Promise<Course[]> {
    this.logger.debug(`This action returns all course`);
    return await this.courseModel.find();
  }

  async findOne(id: string): Promise<Course> {
    this.logger.log(`This action returns a #${id} course`)
    return await this.courseModel.findById({_id:id});
  }

  async update(id: string, change: Partial<Course>): Promise<Course> {
    this.logger.debug(`This action updates a #${id} course`);
    return this.courseModel.findOneAndUpdate(
      {_id: id},
      change,
      {new:true});
  }

  remove(id: string) {
    this.logger.log(`This action removes a #${id} course`);
    return this.courseModel.deleteOne({_id:id});
  }
}
