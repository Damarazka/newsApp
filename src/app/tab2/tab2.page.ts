import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../services/getdata.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  data: any;
  isLoading = true;
  loadingController: any;

  constructor(public getdata: GetdataService) {}

  ngOnInit() {
    this.presentLoading();
    this.getdata.doGet('technology').subscribe(res => {
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
