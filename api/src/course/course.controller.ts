import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {} 

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createCourseDto: CreateCourseDto
    ) : Promise<Course>
    {
    return this.courseService.create(createCourseDto);
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
