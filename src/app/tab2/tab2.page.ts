import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../services/getdata.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  data: any = [];
  isLoading = true;
  isOffline = false;
  searchQuery: string = '';

  constructor(
    public getdata: GetdataService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.presentLoading();
    const isConnected = await this.getdata.checkNetworkStatus();
    if (!isConnected) {
      this.isOffline = true;
    }

    this.getdata.doGet('technology').subscribe(res => {
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

  searchNews() {
    if (this.searchQuery.trim().length > 0) {
      this.isLoading = true;
      this.getdata.searchNews(this.searchQuery).subscribe(res => {
        this.data = res;
        this.isLoading = false;
      }, err => {
        console.error(err);
        this.isLoading = false;
      });
    } else {
      this.ngOnInit();  // Re-fetch general news if search query is empty
    }
  }

  goToDetail(article: any) {
    console.log('Navigating to detail with article:', article);
    this.router.navigate(['/detail'], {
      queryParams: { article: JSON.stringify(article) }
    });
  }
}
