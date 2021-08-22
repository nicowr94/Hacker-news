import { Body, Controller, Get, Param, Post, Put, Res} from '@nestjs/common';
import { Query } from 'mongoose';
import {CreateStoryDTO} from './dto/story.dto';
import {StoryService} from './story.service'


@Controller('story')
export class StoryController {

    constructor(private storyService:StoryService){}

    @Get('/')
    async getStories(@Res() res ) {
        const stories = await this.storyService.getStorys()
        return res.status(200).json(stories)
    }

    @Post("/create")
    async CreatingNotice(@Res() res,@Body() createStory:CreateStoryDTO) {
        const story = await this.storyService.createStory(createStory)
        console.table(createStory)
        //HttpStatus.OK
        return res.status(200).json({
            message: "Story Successfully Created",
            story
        })
    }

    @Get('/:storyID')
    async getStoryID(@Res() res ,@Param('storyID') storyID ) {
        const story = await this.storyService.getStory(storyID);
        if(!story) res.status(404).json({mesagge:"Story does not exists"})
        return res.status(200).json(story)
    }

    @Put('/:storyID')
    async DeleteStory(@Res() res,@Param('storyID') storyID) {

        const updatedProduct = await this.storyService.deleteStory(storyID);
        if (!updatedProduct) res.status(404).json({mesagge:"Story does not exists"})
        return res.status(200).json({
            message: 'Story Updated Successfully',
            updatedProduct 
        });
    }

}
