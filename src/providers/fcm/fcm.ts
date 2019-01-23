import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {
  token: any;

  constructor(
    private platform : Platform,
    public firebaseNative: Firebase,
    private toastCtrl: ToastController) {
    this.firebaseNative.onNotificationOpen().subscribe(data => {
      
      this.presentToast(data);
    });
   
    console.log('Hello FcmProvider Provider');
    
  }
  async getToken(){
    if(this.platform.is('android')){
      this.token = await this.firebaseNative.getToken();
      console.log("android",this.token);
    }
    if(this.platform.is('ios')){
      this.token = await this.firebaseNative.getToken();
      const perm = await this.firebaseNative.grantPermission();
      console.log("ios");
    }
    if (!this.platform.is('cordova')){
      console.log("Is not  cordova");
    }

  }

  presentToast(data:any) {
    if(data.tap){
      console.log(`User opened this notificatison ${JSON.stringify(data)}` );
      
    }else{
      let toast = this.toastCtrl.create({
        message: data.title,
        duration: 3000,
        position: 'top'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }
    
  }

  

  

 
}
