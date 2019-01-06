import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public  afAuth: AngularFireAuth, private router: Router, private authService: AuthService, public zone: NgZone) { }
  public email: string = '';
  public password: string = '';

  ngOnInit() {
  }

   onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
    .then((result) => {
      this.onLoginRedirect();
    }).catch((err) => {
      console.log('err', err.message);
    });
  }

  onLoginGoogle(): void {
    // Lo quitamos de aqui y lo ponemos todo en el servicio que es donde debe ir, en el auth.service.ts
    // this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider() );
    // Lo llamamos desde el servicio y quedaria de esta manera:
    this.authService.loginGoogleUser()
    .then((res) => {
      // En la respuesta podremos ver todos los datos del Usuario, su foto, su UID de usuario, etc etc
      // console.log('resUser', res);
      this.zone.run(() => { this.onLoginRedirect(); });
    }).catch((err) => {
      console.log('err', err.message);
    });
  }

  onLoginFacebook(): void {
    // this.afAuth.auth.signInWithPopup( new auth.FacebookAuthProvider() );
    // this.router.navigate(['tasks']);
    this.authService.loginFacebookUser()
    .then((res) => {
      // Gracias a esta funcion obligamos a Angular a actualizar el DOM.
      // por eso le ponemos que retorne la funcion a ejecutar, en este
      // caso de login: this.onLoginRedirect(); al ejecutarse el zone.run()
      this.zone.run(() => { this.onLoginRedirect(); });
    }).catch((err) => {
      console.log('err', err.message);
    });
  }

  onLogout() {
    // this.afAuth.auth.signOut();
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['welcome']);
  }

}
