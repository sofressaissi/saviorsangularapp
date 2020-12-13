import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { CollectService } from '../shared/collect.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Collect } from '../models/Collect';
import { Category } from '../models/Category';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  users: any;
  collects: any;
  categories: any;
  addUserForm: FormGroup;
  verifInfo = "";
  dataGot: User[];
  dataColGot: Collect[];
  dataCatGot: Category[];
  verifyUser: User[];
  UserToLogOut: User[];
  roles: any =  ['Association', 'Member', 'Admin'];
  role;
  roleIndex;
  i;
  userAdded: any;
  connectedUser: any;
  usernameToShow: string;

  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private collectService: CollectService,
    private catService: CategoryService, private userService: UserService) {
      this.addUserForm = formBuilder.group({
        usernameField: ['', [Validators.required, Validators.minLength(6)]],
        emailField: ['', [Validators.required, Validators.email]],
        passField: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassField: ['', [Validators.required, Validators.minLength(6)]],
        roleField: ['', Validators.required]
      }, {
        validator: this.ConfirmedValidator('passField', 'confirmPassField')
      })
    }
    ConfirmedValidator(controlName: string, matchingControlName: string){
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
          if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
              return;
          }
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ confirmedValidator: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }
  addUser() {
    //this.userService.getUser(this.signUpForm.value.emailField, this.signUpForm.value.passField);
    //this.role = this.signUpForm.get('roleField').value;
    this.dataGot = this.users;
    for (let i = 0; i<this.dataGot.length; i++) {
      if (this.dataGot[i].email == this.addUserForm.value.emailField
       || this.dataGot[i].username == this.addUserForm.value.usernameField) {
         this.verifInfo = "User already exists !";
         break;
      } else {
        this.verifInfo = "";
        if(this.addUserForm.get('roleField').value == "Admin") {
         this.roleIndex = 0;
         }
       if(this.addUserForm.get('roleField').value == "Association") {
         this.roleIndex = 1;
          }
          if(this.addUserForm.get('roleField').value == "Member") {
         this.roleIndex = 2;
          }
      this.userAdded = { username: this.addUserForm.value.usernameField, 
        email: this.addUserForm.value.emailField, 
        password: this.addUserForm.value.passField,
        role: this.roleIndex }
      }
    
    }
    if (this.verifInfo == "") {
    this.userService.addUser(this.userAdded).subscribe(data => {
     alert("User Added Successfully !\nYou will be redirected to the management page !");
     this.router.navigate(['/admin/manage-users']);
   });
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
    this.userService.getUsers().subscribe(e => {
      this.users = e;
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
