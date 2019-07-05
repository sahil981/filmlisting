import { Component, OnInit } from '@angular/core';
import {WebService} from '../service/web.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films = [];
  allFilms;
  page_no = 1;
  constructor(private webService: WebService) { }

  ngOnInit() {
    this.getFilmListing();
  }

  getFilmListing() {
    this.webService.getFilmListing().subscribe(data => {
      if (data) {
        this.allFilms = data;
        this.getNextSetOfData(this.page_no);

      }
    });
  }

  getNextSetOfData(page_no) {
      const filtered = this.allFilms.splice(0, 3 * page_no);
      filtered.forEach((film) => {
        this.films.push(film);
      });
  }
  onScroll() {
    console.log('scrolled');
    this.page_no++;
    this.getNextSetOfData(this.page_no);
  }

}
