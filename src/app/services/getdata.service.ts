import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  apiKey: string = '516319ebc5104926b8fdf746a1abe7d3';

  constructor() { }

  doGet(category: string) {
    const options = {
      url: `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${this.apiKey}`,
    };
    return from(Http.get(options));
  }
}

