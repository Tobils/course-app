import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/guards/role.enum';

@Controller('user')
@Roles(Role.Admin)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete('/all')
  removeAll(){
    return this.userService.removeAll();
  }
}
