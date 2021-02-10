import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersDocument } from 'src/models/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  private logger = new Logger('user-service')

  @InjectModel("Users")
  private userModel: Model<usersDocument>

  async create(createUserDto: CreateUserDto) {
    this.logger.log(`create user data`);
    const passwordHash = await this.hashPassword(createUserDto.password);
    const user = new this.userModel();
    user.email = createUserDto.email;

    const validateUserMail = this.userModel.findOne({
        email: user.email
    })

    if(!validateUserMail){
        user.passwordHash = passwordHash;
        user.roles = [createUserDto.roles];

        user.save();
        return user;
    } else {
        return new HttpException("email has taken, please use others",HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll() {
    this.logger.log(`This action returns all user`);
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    this.logger.warn(`This action removes a #${id} user`)
    return this.userModel.deleteOne({_id:id});
  }

  /**
   * this is danger
   */
  removeAll(){
    this.logger.warn(`This action removes all user`)
    return this.userModel.deleteMany();
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds)
}
}
