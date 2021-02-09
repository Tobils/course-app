
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document,Mongoose, Types } from 'mongoose'
export type coursesDocument = Course & Document;

@Schema()
export class Course {
    
    @Prop({type: Number})
    segNo: number

    @Prop({type: String})
    iconUrl: string

    @Prop({type: String})
    courseListIcon: string

    @Prop({type: String})
    description: string

    @Prop({type: String})
    longDescription: string

    @Prop({type: String})
    category: string

    @Prop({type: Number})
    lessonsCount: number
    
    @Prop({
        type: Boolean,
        default: false
    })
    promo: boolean
}

export const CoursesSchema = SchemaFactory.createForClass(Course);