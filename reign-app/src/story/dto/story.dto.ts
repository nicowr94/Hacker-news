import { Type } from "@nestjs/common";

export  class CreateStoryDTO{

    readonly created_at: Date;
    readonly title:String;
    readonly url:String;
    readonly author:String;
    readonly points:String;
    readonly story_text:String;
    readonly comment_text:String;
    readonly num_comments:String;
    readonly story_id:Number;
    readonly story_title:String;
    readonly story_url:String;
    readonly parent_id:Number;
    readonly _tags:[{type:String}];
    readonly objectID:Number;


}

