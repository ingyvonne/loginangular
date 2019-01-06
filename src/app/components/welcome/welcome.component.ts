import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  };

  public providerId: string = 'null';
  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        console.log('USER ARRAY COMPLETE', user);
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.photoUrl = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        console.log('PROVIDER USER', this.providerId);
      }
    });
  }

}
