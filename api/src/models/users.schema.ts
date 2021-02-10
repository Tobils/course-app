
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document,Mongoose, Types } from 'mongoose'
export type usersDocument = Users & Document;

@Schema()
export class Users {

    @Prop({
        type: String, 
        unique: true, 
        required: true,
        dropDups: true
    })
    email: string

    @Prop({type: Array})
    roles: any

    @Prop({type: String})
    passwordHash: string

}

export const UsersSchema = SchemaFactory.createForClass(Users);