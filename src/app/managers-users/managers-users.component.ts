import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Collect } from '../models/Collect';
import { CollectService } from '../shared/collect.service';
import { Category } from '../models/Category';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-managers-users',
  templateUrl: './managers-users.component.html',
  styleUrls: ['./managers-users.component.css']
})
export class ManagersUsersComponent implements OnInit {

  users: any;
  collects: any;
  categories: any;
  connectedUser: any;
  UserToLogOut: User[];
  dataGot: User[];
  dataColGot: Collect[];
  dataCatGot: Category[];
  verifyUser: User[];
  id;
  username;
  email;
  role;
  totalRecords: number;
  page: number=1;
  usernameToSearch: string;
  usernameToShow: string;

  constructor(private userService: UserService,
    private collectService: CollectService,
    private catService: CategoryService, public router: Router) { }

  deleteUser(userId) {
    if (confirm("Are you sure to delete this User with ID: "+userId+" ?")) {
      for(let i=0; i<this.dataColGot.length; i++) {
        for(let j=0; j<this.dataGot.length; j++) {
        if(this.dataColGot[i].emailOfWhoAdded == this.dataGot[j].email && this.dataGot[j].id == userId) {
          this.collectService.deleteCollect(this.dataColGot[i].id).subscribe(col => {
            console.log("Collects are deleted !");
          })
        }
    }
  }
    this.userService.deleteUser(userId).subscribe(data => {
      alert("User Deleted !");
      alert("Collects of the User are deleted as well !");
      this.router.navigate(['/admin']);
    })
  }
  }

  detailsUser(idP, usernameP, emailP, roleP) {
    this.id = idP;
    this.username = usernameP;
    this.email = emailP;
    this.role = roleP;
  }

  searchByUsername() {
    if (this.usernameToSearch !== "") {
    this.dataGot = this.dataGot.filter(res => {
      return res.username.toLocaleLowerCase().match(this.usernameToSearch.toLocaleLowerCase());
    })
  } else {
    this.ngOnInit();
  }
  }

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
