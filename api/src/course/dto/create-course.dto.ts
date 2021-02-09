import {
    IsInt,
    IsString,
    IsOptional
  } from 'class-validator';
import { Types } from "mongoose";

export class CreateCourseDto {
    @IsOptional()
    _id?: Types.ObjectId

    @IsInt({
        message:"seqNo harus number"
    })
    segNo: number;

    @IsString({
        always: false
    })
    iconUrl: string;

    courseListIcon: string;
    description: string;
    longDescription?: string;
    category: string;
    lessonsCount: number;
    promo: boolean;
}
