import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryController } from './story/story.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { StoryModule } from './story/story.module';
import { mongo } from 'mongoose';

@Module({
  imports: [
    StoryModule,
    MongooseModule.forRoot('mongodb://mongo/reign-app')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
