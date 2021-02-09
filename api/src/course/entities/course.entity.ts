import { Types } from "mongoose";
import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    IsString,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
  } from 'class-validator';

export class Course {
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
