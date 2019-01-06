import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeTaskComponent } from './components/home-task/home-task.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthService } from './services/auth.service';
import { TaskService } from './app/services/task.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    TaskComponent,
    TaskFormComponent,
    TaskListComponent,
    LoginComponent,
    RegisterComponent,
    HomeTaskComponent,
    ProfileComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TaskService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

