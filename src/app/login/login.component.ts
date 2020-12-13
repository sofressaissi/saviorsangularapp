import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../models/User';
import { Role } from '../models/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  verifInfo;
  users: any;
  userConnected: any;
  userLoggedIn: any;
  verifyUser: User[];
  dataGot: User[];
  i;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, 
    private router: Router, private userService: UserService,
    private httpClient: HttpClient) { 
    this.signInForm = formBuilder.group({
      emailField: ['', [Validators.required, Validators.email]],
      passField: ['', [Validators.required]]
    })
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#343A40';
 }

 signIn() {
   /*if (this.signInForm.value.emailField == "admin@saviors.net" && this.signInForm.value.passField == "123456") {
     this.router.navigate(['/admin']);
   } else {
     this.verifInfo = "Verify the info you entered !";
   }*/

   this.userService.getUser(this.signInForm.value.emailField, this.signInForm.value.passField);
   this.dataGot = this.users;
   for (let i = 0; i<this.dataGot.length; i++) {
     if (this.dataGot[i].email == this.signInForm.value.emailField
      && this.dataGot[i].password == this.signInForm.value.passField
      && this.dataGot[i].role == Role.admin) {
        this.userConnected = {
          email: this.signInForm.value.emailField, 
          password: this.signInForm.value.passField,
          role: Role.admin }
       this.userService.addConnectedUser(this.userConnected).subscribe(data => {});
       this.router.navigate(['/admin']);
     } else {
       this.verifInfo = 'Please verify the info you entered !';
     }
     //Assoc Verification
     if (this.dataGot[i].email == this.signInForm.value.emailField
      && this.dataGot[i].password == this.signInForm.value.passField
      && this.dataGot[i].role == Role.association) {
        this.userConnected = {
          email: this.signInForm.value.emailField, 
          password: this.signInForm.value.passField,
          role: Role.association }
       this.userService.addConnectedUser(this.userConnected).subscribe(data => {});
       this.router.navigate(['/association']);
     }
     //Member Verification
     if (this.dataGot[i].email == this.signInForm.value.emailField
      && this.dataGot[i].password == this.signInForm.value.passField
      && this.dataGot[i].role == Role.member) {
        this.userConnected = {
          email: this.signInForm.value.emailField, 
          password: this.signInForm.value.passField,
          role: Role.member }
       this.userService.addConnectedUser(this.userConnected).subscribe(data => {});
       this.router.navigate(['/member']);
     }
   }

 }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(e => {
      this.users = e;
    })
    this.userService.getConnectedUser().subscribe(c => {
      this.userLoggedIn = c;
      this.verifyUser = this.userLoggedIn;
      for (let i = 0; i<this.verifyUser.length; i++) {
        if (this.verifyUser[i].role == 0) {
          this.router.navigateByUrl("/admin");
        }
        if (this.verifyUser[i].role == 1) {
          this.router.navigateByUrl("/association");
        }
        if (this.verifyUser[i].role == 2) {
          this.router.navigateByUrl("/member");
        }
      }
    })
  }

}
