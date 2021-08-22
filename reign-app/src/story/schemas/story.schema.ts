import { Schema } from "mongoose";

export const StorySchemna = new Schema({
    created_at: Date,
    title:String,
    url:String,
    author:String,
    points:String,
    story_text:String,
    comment_text:String,
    num_comments:String,
    story_id:Number,
    story_title:String,
    story_url:String,
    parent_id:Number,
    _tags:[{type:String}],
    objectID:Number,
    sys_val: { type: Number, default: 1 }
},{timestamps: true,
    versionKey: false,}
);


