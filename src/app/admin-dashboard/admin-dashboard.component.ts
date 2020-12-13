import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../shared/user.service';
import { CollectService } from '../shared/collect.service';
import { Collect } from '../models/Collect';
import { CategoryService } from '../shared/category.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  users: any;
  collects: any;
  categories: any;
  connectedUser: any;
  UserToLogOut: User[];
  verifyUser: User[];
  dataColGot: Collect[];
  dataCatGot: Category[];
  dataGot: User[];
  totalRecords: number;
  page: number=1;
  usernameToShow: string;

  constructor(private userService: UserService, 
    private collectService: CollectService,
    private catService: CategoryService, private router: Router) { }

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
    this.catService.getCategories().subscribe(cat => {
      this.categories = cat;
      this.dataCatGot = this.categories;
    })
    this.collectService.getMyCollects().subscribe(col => {
      this.collects = col;
      this.dataColGot = this.collects;
    })
    this.userService.getUsers().subscribe(e => {
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
        if(this.verifyUser[i].role == 1) {
          this.router.navigateByUrl("/association");
        }
        if(this.verifyUser[i].role == 2) {
          this.router.navigateByUrl("/member");
        }
      }
      for(let i=0; i<this.verifyUser.length; i++) {
        if(this.verifyUser.length == 1) {
        this.usernameToShow = this.verifyUser[i].email;
        break;
        }
      }
    })
  }

}
