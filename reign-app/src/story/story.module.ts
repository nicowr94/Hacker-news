import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorySchemna } from './schemas/story.schema';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Story', schema:StorySchemna}
  ]),
  HttpModule
],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule {}
