import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Course } from 'src/models/courses.schema';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {} 

  @Post()
  create(
    @Body() course: Partial<Course>
    // @Body() createCourseDto: CreateCourseDto
    ) : Promise<Course>
    {
    return this.courseService.create(course);
  }

  @Get()
  findAll(): Promise<Course[]> { 
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() change: Partial<Course>
    // @Body() updateCourseDto: UpdateCourseDto
    ): Promise<Course> {
    return this.courseService.update(id, change);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
