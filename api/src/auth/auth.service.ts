import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, usersDocument } from 'src/models/users.schema';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {

    private logger = new Logger('auth-service');


    @InjectModel("Users")
    private userModel: Model<usersDocument>


    async register(createUserDto: CreateUserDto) {
        this.logger.log(`create user data`);
        const passwordHash = await this.hashPassword(createUserDto.password);
        const user = new this.userModel();
        user.email = createUserDto.email;

        const validateUserMail = await this.userModel.findOne({
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
        const user = await this.userModel.findOne({email:loginDto.email})
        if(!user){
            this.logger.error(`User mail does not exist on the database`)
            throw new UnauthorizedException();
        }

        
        return new Promise((resolve, reject) => {
            bcrypt.compare(loginDto.password,user.passwordHash, function(err, result) {
                console.log(result)
                if(!result){
                    reject(new UnauthorizedException())
                }

                const authJwtToken = jwt.sign({
                    id: user._id,
                    roles: user.roles
                }, process.env.JWT_SECRET)

                const payload = {
                    access_token: authJwtToken
                }

                resolve(payload)
            })
        })
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds)
    }
}
