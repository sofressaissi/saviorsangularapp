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
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  users: any;
  mycollects: any;
  mycategories: any;
  addCatForm: FormGroup;
  verifInfo = "";
  dataGot: Category[];
  verifyUser: User[];
  UserToLogOut: User[];
  roles: any =  ['Association', 'Member', 'Admin'];
  role;
  roleIndex;
  i;
  collected: number = 0;
  categoryAdded: any;
  connectedUser: any;
  usernameToShow: string;
  urlImage;
  imageName;

  constructor(private formBuilder: FormBuilder, 
    private router: Router, private userService: UserService, 
    private collectService: CollectService, private categoryService: CategoryService) {
      this.addCatForm = formBuilder.group({
        nomCatField: ['', [Validators.required, Validators.minLength(6)]],
        descCatField: ['', [Validators.required, Validators.minLength(6)]]
      }
      )
    }

    addCat() {
      //this.userService.getUser(this.signUpForm.value.emailField, this.signUpForm.value.passField);
      //this.role = this.signUpForm.get('roleField').value;
      this.dataGot = this.mycategories;
      for (let i = 0; i<this.dataGot.length; i++) {
        if (this.dataGot[i].nomCat == this.addCatForm.value.nomCatField) {
           this.verifInfo = "Category already exists !";
           break;
        } else {
          this.verifInfo = "";

        this.categoryAdded = { nomCategory: this.addCatForm.value.nomCatField, 
          descriptionCategory: this.addCatForm.value.descCatField,
          emailOfWhoAdded: this.usernameToShow }
        }
      
      }
      if (this.verifInfo == "") {
      this.categoryService.addCategory(this.categoryAdded).subscribe(data => {
       alert("Category Added Successfully !\nYou will be redirected to the management page !");
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
