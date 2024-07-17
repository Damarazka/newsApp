import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../services/getdata.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

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

    this.getdata.doGet('sports').subscribe(res => {
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
