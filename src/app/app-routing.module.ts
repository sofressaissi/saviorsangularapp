import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddCollectComponent } from './add-collect/add-collect.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AssociationHomeComponent } from './association-home/association-home.component';
import { DetailsCollectComponent } from './details-collect/details-collect.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ManageCollectsComponent } from './manage-collects/manage-collects.component';
import { ManagersUsersComponent } from './managers-users/managers-users.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: "admin", component: AdminDashboardComponent },
  { path: "signup", component: SignupComponent },
  { path: "admin/manage-users", component: ManagersUsersComponent },
  { path: "admin/manage-users/add-user", component: AddUserComponent },
  { path: "association", component: AssociationHomeComponent },
  { path: "member", component: MemberHomeComponent },
  { path: "association/manage-collects", component: ManageCollectsComponent },
  { path: "association/manage-collects/add-collect", component: AddCollectComponent },
  { path: "association/manage-collects/add-category", component: AddCategoryComponent },
  { path: "home", component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
