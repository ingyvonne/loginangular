import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined} from 'util';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afsAuth: AngularFireAuth, private router: Router) { }

  // constructor( private afsAuth: AngularFireAuth , private http: HttpClient) { }
  // headers: HttpHeaders = new HttpHeaders({
  // 'Content-Type': 'application/json'
  // });

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
        err => reject (err));
      });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject (err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup( new auth.FacebookAuthProvider() );
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup( new auth.GoogleAuthProvider() )
    .then(credential => this.guardarEnTuBaseDeDatos(credential.user));
  }

  private guardarEnTuBaseDeDatos(user) {
    // Tu code --- TODO!********************************
  console.log(user);
  console.log(user.displayName);
  }

  logoutUser () {
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }


  // registerUser(name: string, email: string, password: string) {
  //   const url_api = 'http://localhost:8084/PwaAPI/api/user_testA';
  //   return this.http.post(url_api, {
  //     name: name,
  //     email: email,
  //     password: password
  //   }, {headers: this.headers})
  //   .pipe(map(data => data));
  // }

  // loginUser(email: string, password: string): Observable<any> {
  //   // A nuestra url le pasamos tambien el parametro include=user para que en la respuesta del servidor
  //   // me incluya los parametros de usuario y contraseña
  //   const url_api = 'http://localhost:3000/api/Users/login?include=user';
  //   return this.http.post(url_api, {
  //     email: email,
  //     password: password
  //   }, {headers: this.headers})
  //   .pipe(map(data => data));
  // }

  // setUser(user): void {
  //   const user_string =  JSON.stringify(user);
  //   localStorage.setItem('currentUser', user_string);
  // }

  // setToken(token): void {
  //   localStorage.setItem('accesToken', token);
  //   return token;
  // }

  // getToken() {
  //   return localStorage.getItem('accesToken');
  // }

  // getCurrentUser() {
  //   const user_string =  localStorage.getItem('currentUser');
  //   if (isNullOrUndefined(user_string)) {
  //     const user = JSON.parse(user_string);
  //     return user;
  //   } else {
  //     return null;
  //   }
  // }

  // logoutUser(){
  //   let accessToken = localStorage.getItem('accesToken');
  //   const url_api = `http://localhost:3000/api/Users/logout?accessToken=${accessToken}`;
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('currentUser');
  //   return this.http.post(url_api, {headers: this.headers});
  // }
}
