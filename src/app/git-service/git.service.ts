import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repo } from '../repo';
import { User } from '../user';
import { SearchFormComponent } from '../search-form/search-form.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GithubRequestService {
  user: User;
  repo: any;
  repos: any = [];

  constructor(private http: HttpClient, private router: Router) {
    this.user = new User('', '', '', '', 0, 0, '');
  }
  searchUsers(profileName: string) {
    console.log(profileName);
    interface ApiResponse {
      avatar_url: string;
      login: string;
      html_url: number;
      public_repos: number;
      followers: number;
      following: number;
      name: string;
    }

    let userSearch = 'https://api.github.com/users/' + profileName;
    console.log(userSearch);

    let promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiResponse>(userSearch)
        .toPromise()
        .then(
          (response) => {
            this.user.avatar_url = response.avatar_url;
            this.user.followers = response.followers;
            this.user.following = response.following;
            this.user.login = response.login;
            this.user.name = response.name;
            this.user.public_repos = response.public_repos;
            this.user.html_url = response.html_url;

            resolve();
          },
          (error) => {
            console.log(error);

            reject();
          }
        );
    });
    return promise;
  }
  searchRepos(repoName: string[]) {
    console.log(repoName);
    interface ApiResponse {
      name: string;
      repos_url: string;
      created_at: Date;
      description: string;
    }

    let repoSearch = `https://api.github.com/users/${repoName}/repos`;
    console.log(repoSearch);

    let promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiResponse[]>(repoSearch)
        .toPromise()
        .then(
          (repoResponse) => {
            repoResponse.forEach((repoResponse) => {
              this.repo = new Repo(
                repoResponse.name,
                repoResponse.repos_url,
                repoResponse.created_at,
                repoResponse.description
              );
              this.repos.push(this.repo);
            });
            resolve();
          },
          (error) => {
            console.log(error);

            reject();
          }
        );
    });
    return promise;
  }
}
