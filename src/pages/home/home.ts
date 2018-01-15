import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any = [];
  isLoggedIn: boolean = false;

  constructor(public navCtrl: NavController, private fb: Facebook) {
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }

  // login(){
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //   .then((res: FacebookLoginResponse) => {
  //     console.log('Logged into Facebook!', res);
  //     this.userid = res.authResponse.userID;
  //   })
    
  //   .catch(e => console.log('Error logging into Facebook', e));
  // }

  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  // logout(){
  //   this.fb.logout()
  //   .then(() => console.log("Hecho el logout"))
  //   .catch(e => console.log('Error logging out Facebook', e));
  // }

  // getUserDetails(){
  //   this.getUserDetail(this.userid);
  // }

  // getUserDetail(userid) {
  //   this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
  //     .then(res => {
  //       console.log(res);
  //       this.users = res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

}
