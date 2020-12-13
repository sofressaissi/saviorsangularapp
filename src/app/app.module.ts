import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SignupComponent } from './signup/signup.component';
import { ManagersUsersComponent } from './managers-users/managers-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AssociationHomeComponent } from './association-home/association-home.component';
import { ManageCollectsComponent } from './manage-collects/manage-collects.component';
import { AddCollectComponent } from './add-collect/add-collect.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CollectsDisplayedComponent } from './collects-displayed/collects-displayed.component';
import { DetailsCollectComponent } from './details-collect/details-collect.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    LoginComponent,
    SignupComponent,
    ManagersUsersComponent,
    AddUserComponent,
    AssociationHomeComponent,
    ManageCollectsComponent,
    AddCollectComponent,
    AddCategoryComponent,
    CollectsDisplayedComponent,
    DetailsCollectComponent,
    MemberHomeComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
