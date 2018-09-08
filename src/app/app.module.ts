import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { HomeDoctorsPage } from '../pages/home-doctors/home-doctors';
import { HomePharmacyPage } from '../pages/home-pharmacy/home-pharmacy';
import { HomeMinistryPage } from '../pages/home-ministry/home-ministry';
import { NewQrPage } from '../pages/new-qr/new-qr';
import { ModalDoctorPage } from '../pages/modal-doctor/modal-doctor';
import { ModalQrPage } from '../pages/modal-qr/modal-qr';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Guid } from "guid-typescript";





var config = {
  apiKey: "AIzaSyDUBtCAdjZem5IbH9PqMhudLVAXxJNq51o",
  authDomain: "medicalqr-42850.firebaseapp.com",
  databaseURL: "https://medicalqr-42850.firebaseio.com",
  projectId: "medicalqr-42850",
  storageBucket: "medicalqr-42850.appspot.com",
  messagingSenderId: "988656361007"
};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    HomeDoctorsPage,
    HomePharmacyPage,
    HomeMinistryPage,
    NewQrPage,
    ModalDoctorPage,
    ModalQrPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config,'medicalqr'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    HomeDoctorsPage,
    HomePharmacyPage,
    HomeMinistryPage,
    NewQrPage,
    ModalDoctorPage,
    ModalQrPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseServiceProvider,
    BarcodeScanner,
    
  ]
})
export class AppModule {}
