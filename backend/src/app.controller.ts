import { Controller, Get, Param } from '@nestjs/common';
import { GitHubService } from './github.service';

@Controller('user')
export class AppController {
  constructor(private readonly gitHubService: GitHubService) {}

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.gitHubService.getGitHubUser(username);
  }
}
