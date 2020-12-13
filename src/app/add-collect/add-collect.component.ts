import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { CollectService } from '../shared/collect.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Collect } from '../models/Collect';
import { CategoryService } from '../shared/category.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-add-collect',
  templateUrl: './add-collect.component.html',
  styleUrls: ['./add-collect.component.css']
})
export class AddCollectComponent implements OnInit {

  users: any;
  mycollects: any;
  mycategories: any;
  addCollectForm: FormGroup;
  verifInfo = "";
  dataGot: Collect[];
  dataCatGot: Category[];
  verifyUser: User[];
  UserToLogOut: User[];
  roles: any =  ['Association', 'Member', 'Admin'];
  role;
  roleIndex;
  i;
  collected: number = 0;
  collectAdded: any;
  connectedUser: any;
  usernameToShow: string;
  urlImage;
  imageName;

  constructor(private formBuilder: FormBuilder, 
    private router: Router, private userService: UserService, 
    private collectService: CollectService, private categoryService: CategoryService) { 
      this.addCollectForm = formBuilder.group({
        nomCField: ['', [Validators.required, Validators.minLength(6)]],
        descCField: ['', [Validators.required, Validators.minLength(6)]],
        reqMoneyField: ['', [Validators.required, Validators.min(500)]],
        categoryField: ['', Validators.required],
        fileCField: ['', Validators.required]
      }
      )
    }

    onSelectFile(e) {
      if(e.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event: any)=>{
          this.urlImage = event.target.result;
          this.imageName = event.target.files[0].name;
        }
      }
    }

    addCollect() {
      //this.userService.getUser(this.signUpForm.value.emailField, this.signUpForm.value.passField);
      //this.role = this.signUpForm.get('roleField').value;
      this.dataGot = this.mycollects;
      this.dataCatGot = this.mycategories;
      for (let i = 0; i<this.dataGot.length; i++) {
        if (this.dataGot[i].nomC == this.addCollectForm.value.nomCField
          || this.dataGot[i].urlImage == this.urlImage) {
           this.verifInfo = "Collect already exists !";
           break;
        } else {
          this.verifInfo = "";

        this.collectAdded = { nomC: this.addCollectForm.value.nomCField, 
          descriptionC: this.addCollectForm.value.descCField, 
          fond: this.addCollectForm.value.reqMoneyField,
          fontAtteint: this.collected,
          urlImage: this.urlImage,
          categoryCollect: this.addCollectForm.get('categoryField').value,
          emailOfWhoAdded: this.usernameToShow }
        }
      
      }
      if (this.verifInfo == "") {
      this.collectService.addMyCollect(this.collectAdded).subscribe(data => {
       alert("Collect Added Successfully !\nYou will be redirected to the management page !");
       this.router.navigate(['/association/manage-collects']);
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
    this.categoryService.getCategories().subscribe(cat => {
      this.mycategories = cat;
    })
    this.collectService.getMyCollects().subscribe(col => {
      this.mycollects = col;
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
