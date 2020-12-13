import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { CollectService } from '../shared/collect.service';
import { Collect } from '../models/Collect';

@Component({
  selector: 'app-manage-collects',
  templateUrl: './manage-collects.component.html',
  styleUrls: ['./manage-collects.component.css']
})
export class ManageCollectsComponent implements OnInit {

  users: any;
  collects: any;
  connectedUser: any;
  UserToLogOut: User[];
  dataGot: User[];
  dataCollectGot: Collect[];
  verifyUser: User[];
  id;
  username;
  email;
  role;
  totalRecords: number;
  page: number=1;
  collectNameToSearch: string;
  usernameToShow: string;

  constructor(private userService: UserService, private collectService: CollectService, public router: Router) { }

  deleteCollect(idCollect) {
    if (confirm("Are you sure to delete this Collect with ID: "+idCollect+" ?")) {
    this.collectService.deleteCollect(idCollect).subscribe(data => {
      alert("Collect Deleted !");
      this.router.navigate(['/association/manage-collects']);
    })
  }
  }

  searchByCollectName() {
    if (this.collectNameToSearch !== "") {
    this.dataCollectGot = this.dataCollectGot.filter(res => {
      return res.nomC.toLocaleLowerCase().match(this.collectNameToSearch.toLocaleLowerCase());
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
    this.collectService.getMyCollects().subscribe((e) => {
      this.collects = e;
      this.dataCollectGot = this.collects;
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
        break;
        }
      }
    })
  }

}
