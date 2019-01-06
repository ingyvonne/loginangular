import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeTaskComponent } from './components/home-task/home-task.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    // Aqui es donde estaran nuestras rutas
    // Importante tener en cuenta que el orden en el que se declaran las rutas importa
    // por eso debemos comenzar desde el componente de la home
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'tasks', component: HomeTaskComponent, canActivate: [AuthGuard] },
    { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
