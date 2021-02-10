import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, usersDocument } from 'src/models/users.schema';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    private logger = new Logger('auth-service');


    @InjectModel("Users")
    private userModel: Model<usersDocument>


    async register(createUserDto: CreateUserDto) {
        this.logger.log(`create user data`);
        const passwordHash = await this.hashPassword(createUserDto.password);
        this.logger.log(passwordHash) 

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

    async login(loginDto: LoginDto){
        // const user = await this.userModel.findOne({email:loginDto.email})
        // if(!user){
        //     this.logger.error(`User mail does not exist on the database`)
        //     throw new UnauthorizedException();
        // }
        
        // return new Promise((resolve, reject) => {
        //     password(loginDto.password).verifyAgainst(
        //         user.passwordHash,
        //         (err, verified) => {
    
        //             if( !verified){
        //                 reject(new UnauthorizedException());
        //             }


        //         }
        //     )
        // });
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds)
    }
}