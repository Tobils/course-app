
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type coursesDocument = Course & Document;

@Schema()
export class Course {
    @Prop({type: Number})
    segNo: number

    @Prop({type: String})
    url: string

    @Prop({type: String})
    coursesListIcon: string

    @Prop({type: String})
    description: string

    @Prop({type: String})
    longDescription: string

    @Prop({type: String})
    category: string

    @Prop({type: Number})
    lessonCount: number
    
    @Prop({
        type: Boolean,
        default: false
    })
    promo: boolean
}

export const CoursesSchema = SchemaFactory.createForClass(Course);