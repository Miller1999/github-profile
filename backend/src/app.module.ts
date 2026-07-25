import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitHubService } from './github.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, GitHubService],
})
export class AppModule {}
