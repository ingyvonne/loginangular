import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // model = new Usuario('1', '', '');

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage, public zone: NgZone) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email: string = '';
  public password: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    // para recuperar la url de nuestro fichero
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  // get currentUser() {
  //   return JSON.stringify(this.model);
  // }

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.authService.isAuth().subscribe(user => {
        if (user) {
          user.updateProfile({
            displayName: '',
            // photoURL: 'https://example.com/hola.png'
           photoURL: this.inputImageUser.nativeElement.value
          }).then( () => {
            console.log('USER UPDATED!');
            this.router.navigate(['welcome']);
          }).catch( (error) => {
            console.log('error', error);
          });
        }
      });
    }).catch((err) => console.log('err', err.message));
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      this.zone.run(() => { this.onLoginRedirect(); });
    }).catch((err) => {
      console.log('err', err.message);
    });
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
    .then((res) => {
      this.zone.run(() => { this.onLoginRedirect(); });
    }).catch((err) => {
      console.log('err', err.message);
    });
  }

  onLoginRedirect(): void {
    this.router.navigate(['welcome']);
    // this.refresh();
  }

  // refresh() {
  //   window.location.reload();
  // }

}
