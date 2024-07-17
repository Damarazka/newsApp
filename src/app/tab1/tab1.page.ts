import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../services/getdata.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  data: any = [];
  isLoading = true;
  isOffline = false;

  constructor(
    public getdata: GetdataService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.presentLoading();
    const isConnected = await this.getdata.checkNetworkStatus();
    if (!isConnected) {
      this.isOffline = true;
    }

    this.getdata.doGet('business').subscribe(res => {
      this.data = res;
      this.isLoading = false;
      this.loadingController.dismiss();
    }, err => {
      console.error(err);
      this.isLoading = false;
      this.loadingController.dismiss();
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 0
    });
    await loading.present();
  }
}
