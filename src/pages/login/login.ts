import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import { HomeDoctorsPage } from '../home-doctors/home-doctors';
import { HomePharmacyPage } from '../home-pharmacy/home-pharmacy';
import { HomeMinistryPage } from '../home-ministry/home-ministry';
import { RegisterPage } from '../register/register';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user : any = {};
  correctUser : any = {};
  loggedUser : any = {};
  allUsers : any = {};
  allRoles : any;
  errorMessage : any;
  private todo : FormGroup;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public firebase: DatabaseServiceProvider, private formBuilder: FormBuilder) {
    this.loggedUser = this.formBuilder.group({
      document: ['', Validators.required],
      password: ['', Validators.required],
      role : ['', Validators.required],
    });
    this.allUsers = {};
    this.allRoles = [];
    this.obtainAllUsers();
    this.obtainAllRoles();
  }

  ionViewWillEnter(){
    this.obtainAllUsers();
    this.obtainAllRoles();
  }

  obtainAllUsers(){
    this.firebase.getAllUsers().valueChanges().subscribe(
      allUsers => {
        this.allUsers = allUsers;
      }
    )
  }

  obtainAllRoles(){
    this.firebase.getRoles().valueChanges().subscribe(
      roles => {
        this.allRoles = roles;
      }
    )
  }
    

  logForm(){
    this.correctUser = {};
    this.errorMessage = {};

    this.loggedUser.value.document = this.loggedUser.value.document.replace('-', '');
    this.loggedUser.value.document = this.loggedUser.value.document.replace('-', '');

    for (let i = 0; i < this.allUsers.length; i++) {
      if(this.allUsers[i].document == this.loggedUser.value.document){
        this.errorMessage = {};
        this.correctUser = this.allUsers[i];
        break;
      }else{
        this.errorMessage = "Los datos ingresados no son correctos"
      }
    } 

    if(this.errorMessage != "El usuario indicado no existe"){
      if(this.loggedUser.value.password == this.correctUser.password){
        if(this.correctUser.user_state_id == "2103d550-17c2-4ff5-9b61-73e7f4ea6a7f"){//Usuario habilitado
          if(this.loggedUser.value.role == this.correctUser.role_id){
            if (this.correctUser.role_id == "37a938a1-e7f0-42c2-adeb-b8a9a36b6cb8"){ //Doctores
              this.navCtrl.push(HomeDoctorsPage);
            }else if (this.correctUser.role_id == "35d0b156-e7be-4af1-a84d-3e9e30a2bd06"){ //Ministerio
              this.navCtrl.push(HomeMinistryPage);
            }else {
              this.navCtrl.push(HomePharmacyPage);
            }
          }else{
            this.errorMessage = {};
            this.errorMessage = "Los datos ingresados no son correctos"
          }
        }else {
          this.errorMessage = {};
          this.errorMessage = "Los datos ingresados no son correctos"
        }
      }else{
        this.errorMessage = {};
        this.errorMessage = "Los datos ingresados no son correctos"
      } 
    }   

    if(this.errorMessage != null){
      this.showPrompt(this.errorMessage)
    }
    else {
      this.navCtrl.push(HomePharmacyPage);
    }
  }

  showPrompt(errorMessage) {
    const alert = this.alertCtrl.create({
      title: '¡Error!',
      subTitle: errorMessage,
      buttons: ['OK']
    });
    alert.present();
}

  register() {
    this.navCtrl.push(RegisterPage);
  }
} 


