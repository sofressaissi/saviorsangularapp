import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-association-home',
  templateUrl: './association-home.component.html',
  styleUrls: ['./association-home.component.css']
})
export class AssociationHomeComponent implements OnInit {

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

  logout() {
    if(confirm("Are you sure you want to log out ?")) {
      this.UserToLogOut = this.connectedUser;
      for (let i = 0; i<this.UserToLogOut.length; i++) {
      this.userService.deleteConnectedUser(this.UserToLogOut[i].id).subscribe(data => {
      this.router.navigateByUrl('/login');
    })
  }
  }
}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((e) => {
      this.users = e;
      this.dataGot = this.users;
    })
    this.userService.getConnectedUser().subscribe(c => {
      this.connectedUser = c;
      this.verifyUser = this.connectedUser;
      if(this.verifyUser.length == 0) {
        this.router.navigateByUrl("/login");
      }
      for(let i=0; i<this.verifyUser.length; i++) {
        if(this.verifyUser[i].role == 0) {
          this.router.navigateByUrl("/admin");
        }
        if(this.verifyUser[i].role == 2) {
          this.router.navigateByUrl("/member");
        }
    }
      for(let i=0; i<this.verifyUser.length; i++) {
        if(this.verifyUser.length == 1) {
        this.usernameToShow = this.verifyUser[i].email;
        }
      }
    })
  }

}
