import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { GitRequestService } from '../git-http/git-request.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: User;
  repos!: any;
  profileName: string = '';
  repoName: any[] = [];

  constructor(
    private gitHttpService: GitRequestService,
    private router: Router,
    // private reposService: ReposService
  ) {}

  submit(val: any) {
    this.gitHttpService.searchUsers(val.search);
    this.gitHttpService.searchRepos(val.search);
    this.repoName = this.gitHttpService.repos;
  }

  ngOnInit() {
    this.user = this.gitHttpService.user;
    console.log(this.profileName);
  }
}
