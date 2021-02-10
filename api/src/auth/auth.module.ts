import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/models/users.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: Users.name,
        useFactory: () => {
          const schema = UsersSchema
          schema.plugin(require('mongoose-unique-validator'), 
          {
            message: 'email has taken, please use others'
          });
          return schema;
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
