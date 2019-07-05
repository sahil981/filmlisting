import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http: HttpClient) { }

  getFilmListing(){
    return this.http.get<any>(' https://ghibliapi.herokuapp.com/films');
  }
}
