import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../services/getdata.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  data: any;
  isLoading = true;
  loadingController: any;

  constructor(public getdata: GetdataService) {}

  ngOnInit() {
    this.presentLoading();
    this.getdata.doGet('sports').subscribe(res => {
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
