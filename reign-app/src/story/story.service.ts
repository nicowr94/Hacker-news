import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Story} from './interfaces/story.interface';
import {CreateStoryDTO} from './dto/story.dto';
import { Cron, Scheduled } from 'nestjs-cron';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

@Injectable()
@Scheduled()
export class StoryService {
    constructor(@InjectModel('Story') private readonly storyModel:Model<Story>,private httpService: HttpService){}

    
    // @Cron('* * * * * ')
    @Cron('*/59 * * * *')
    async getApiHn() {

        const res = this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs');
        const dataResponse = await firstValueFrom(res);
        const listStory= dataResponse.data.hits;

        const listNewStory =await Promise.all(listStory.map( async (story:CreateStoryDTO) => {
            const { objectID} = story;
            const response = await this.storyModel.findOne({objectID}); 
            if(!response){
                const newStory = new this.storyModel(story);
                await newStory.save()
                return newStory.objectID;
            }
        }));

        return listNewStory;
    }

    async getStorys()  : Promise <Story[]>{
        const stories =await this.storyModel.find({sys_val:1}).sort( { "created_at": -1 } );
        return stories
    }

    async getStory(storyID:string) : Promise<Story>{
        const story = await this.storyModel.findById(storyID);
        return story    
    }

    async createStory(createStoryDTO:CreateStoryDTO) : Promise<Story>{
        const story = new this.storyModel(createStoryDTO);
        return await story.save()
    }

    async deleteStory(storyID:string) : Promise<Story>{
        const updateStory =await this.storyModel.findByIdAndUpdate(storyID,{sys_val:0},{new:true});
        return updateStory
    }

}
