import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GitHubService {
  constructor(private readonly httpService: HttpService) {}

  async getGitHubUser(username: string): Promise<any> {
    const url = `https://api.github.com/users/${username}`;
    const response: AxiosResponse<any> = await firstValueFrom(
      this.httpService.get(url),
    );
    return response.data;
  }
}
