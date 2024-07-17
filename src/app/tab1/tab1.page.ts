import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../services/getdata.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  data: any;
  isLoading = true;
  loadingController: any;

  constructor(public getdata: GetdataService) {}

  ngOnInit() {
    this.presentLoading();
    this.getdata.doGet('business').subscribe(res => {
      this.data = res.data.articles;
      console.log(this.data);
      this.isLoading = false;
    }, err => {
      console.error(err);
      this.isLoading = false;
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
