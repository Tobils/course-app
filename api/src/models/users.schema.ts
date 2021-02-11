
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
export type usersDocument = Users & Document;

@Schema()
export class Users {

    @Prop({
        type: String, 
    })
    email: string

    @Prop({type: Array})
    roles: any

    @Prop({type: String})
    passwordHash: string
}

export const UsersSchema = SchemaFactory.createForClass(Users);