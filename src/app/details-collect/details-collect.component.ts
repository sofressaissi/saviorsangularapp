import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollectService } from '../shared/collect.service';

@Component({
  selector: 'app-details-collect',
  templateUrl: './details-collect.component.html',
  styleUrls: ['./details-collect.component.css']
})
export class DetailsCollectComponent implements OnInit {

  @Input() idCol;
  @Input() urlImg;
  @Input() collectName;
  @Input() descCollect;
  @Input() requestedMoney;
  @Input() collectedMoney;
  @Input() categoryC;
  @Input() addedBy;
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
  roleToManageButton: number;
  updateColForm: FormGroup;
  colToUpdate: any;
  collectToRemove: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private collectService: CollectService, public router: Router) {
    this.updateColForm = formBuilder.group({
      donateMoney: ['', [Validators.required, Validators.min(50)]]
    })
  }

  updateCollect(): void {
    this.collectToRemove = { nomC: this.collectName, 
      descriptionC: this.descCollect, 
      fond: this.requestedMoney,
      fontAtteint: this.collectedMoney,
      urlImage: this.urlImg,
      categoryCollect: this.categoryC,
      emailOfWhoAdded: this.addedBy }
      this.colToUpdate = { nomC: this.collectName, 
        descriptionC: this.descCollect, 
        fond: this.requestedMoney,
        fontAtteint: this.collectedMoney+this.updateColForm.get('donateMoney').value,
        urlImage: this.urlImg,
        categoryCollect: this.categoryC,
        emailOfWhoAdded: this.addedBy }
        
        this.collectService.deleteCollect(this.idCol).subscribe(data => {
          console.log("Collect Removed to be updated !");
          this.collectService.addMyCollect(this.colToUpdate).subscribe(col => {
            alert("Thank you for the donation !\nYou will be redirected to the home page !");
            this.router.navigateByUrl('/login');
          })
        });
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
    }
      for(let i=0; i<this.verifyUser.length; i++) {
        if(this.verifyUser.length == 1) {
        this.usernameToShow = this.verifyUser[i].email;
        }
        if(this.verifyUser[i].role == 1) {
          this.roleToManageButton = 1;
        }
        if(this.verifyUser[i].role == 2) {
          this.roleToManageButton = 2;
        }
      }
    })
  }

}
