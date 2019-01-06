import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/User';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  };

  // para conocer si mi usuario se ha logueado con usuario y contraseña o con
  // facebook o google tengo que acceder al providerID de mi user

  public providerId: string = 'null';
  ngOnInit() {
    // comprobamos si nuestro usuario esta logueado
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        console.log('USER', this.providerId);
      }
    });
  }
}
