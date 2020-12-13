import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  users: any;
  connectedUser: any;
  UserToLogOut: User[];
  dataGot: User[];
  verifyUser: User[];
  id;
  username;
  email;
  role;
  totalRecords: number;
  page: number=1;
  usernameToSearch: string;
  usernameToShow: string;

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((e) => {
      this.users = e;
      this.dataGot = this.users;
    })
    this.userService.getConnectedUser().subscribe(c => {
      this.connectedUser = c;
      this.verifyUser = this.connectedUser;
      for(let i=0; i<this.verifyUser.length; i++) {
        if(this.verifyUser[i].role == 0) {
          this.router.navigateByUrl("/admin");
        }
        if(this.verifyUser[i].role == 1) {
          this.router.navigateByUrl("/association");
        }
        if(this.verifyUser[i].role == 2) {
          this.router.navigateByUrl("/member");
        }
    }
    })
  }

}
