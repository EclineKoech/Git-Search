import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repo } from '../repo';
import { SearchFormComponent } from '../search-form/search-form.component';
import { User } from '../user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GitRequestService {
  user!: User;
  repo: any;
  repos: any = [];

  constructor(private http: HttpClient, private router: Router) {
    this.user = new User('', '', '', '', 0, 0, '');
  }
  searchRepos(repoName: string[]) {
    console.log(repoName)
    interface ApiResponse {
   name:string,
   repos_url:string,
   created_at:Date,
   description:string
    }
  
  let repoSearch =
    `https://api.github.com/users/${repoName}/repos` 
    console.log(repoSearch);

    let promise = new Promise<void>((resolve,reject)=>{
      this.http.get<ApiResponse[]>(repoSearch)
        .toPromise()
        .then(
          (repoResponse) => {
            repoResponse.forEach(repoResponse=>{
              this.repo = new Repo(
                repoResponse.name,
                repoResponse.repos_url,
                repoResponse.created_at,
                repoResponse.description
              );
              this.repos.push(this.repo);
            })
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

