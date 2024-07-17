import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { from, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  apiKey: string = '516319ebc5104926b8fdf746a1abe7d3';

  constructor() { }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    return status.connected;
  }

  async getCachedData(category: string) {
    const { value } = await Preferences.get({ key: `news-${category}` });
    return value ? JSON.parse(value) : null;
  }

  async cacheData(category: string, data: any) {
    await Preferences.set({
      key: `news-${category}`,
      value: JSON.stringify(data)
    });
  }

  doGet(category: string) {
    const options = {
      url: `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${this.apiKey}`,
    };
    return from(Http.get(options)).pipe(
      tap(response => {
        this.cacheData(category, response.data.articles);
      }),
      map(response => response.data.articles),
      catchError(async () => {
        console.error('Error fetching data, returning cached data');
        const cachedData = await this.getCachedData(category);
        return cachedData || [];
      })
    );
  }
}
