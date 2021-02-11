import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, usersDocument } from 'src/models/users.schema';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import { Role } from 'src/guards/role.enum';
import { generate } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

    private logger = new Logger('auth-service');


    @InjectModel("Users")
    private userModel: Model<usersDocument>


    async register(createUserDto: CreateUserDto) {
        this.logger.log(`create user data`);

        const isRoleExist = this.checkRoles(createUserDto.roles);

        if (!isRoleExist){
            return new HttpException("role does not exist, use right roles",HttpStatus.UNPROCESSABLE_ENTITY);
        }


        const isMailExist = await this.userModel.findOne({
            email: createUserDto.email
        })

        if(!isMailExist){
            const user = new this.userModel();
            user.email = createUserDto.email;
            const passwordHash = await this.hashPassword(createUserDto.password);
            user.passwordHash = passwordHash;
            user.roles = [createUserDto.roles];

            user.save();

            const access_token = this.generateToken(user._id,user.roles)
            return access_token;

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

        const access_token = this.generateToken(user._id,user.roles)

        return new Promise((resolve, reject) => {
            bcrypt.compare(loginDto.password,user.passwordHash, function(err, result) {
                if(!result){
                    reject(new UnauthorizedException())
                }

                resolve(access_token)
            })
        })
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds)
    }

    generateToken(id: string, roles: string){
        const authJwtToken = jwt.sign({
            id: id,
            roles: roles
        }, process.env.JWT_SECRET)

        const payload = {
            access_token: authJwtToken
        }

        return payload;
    }

    checkRoles(role: string): boolean {
        let existRole = false
        for (let itemRole in Role){
            if(role == Role[itemRole]){
                existRole = true;
                break;
            }
        }

        return existRole;
    }
}
