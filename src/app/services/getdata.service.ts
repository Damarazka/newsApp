import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor() { }

  doGet = () => {
    const options = {
      url: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=516319ebc5104926b8fdf746a1abe7d3',
    }
    return from(Http.get(options))
  }
}
