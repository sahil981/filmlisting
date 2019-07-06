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
  searchKeyword;
  order = false;
  orderedBy;
  constructor(private webService: WebService) { }

  ngOnInit() {
    this.getFilmListing();
  }

  getFilmListing() {
    this.webService.getFilmListing().subscribe(data => {
      if (data) {
        this.allFilms = data;
        localStorage.setItem('all_films', JSON.stringify(this.allFilms));
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
    if (this.page_no) {
      this.page_no++;
      this.getNextSetOfData(this.page_no);
    }
  }

  search() {
    this.allFilms = JSON.parse(localStorage.getItem('all_films'));
    if (this.searchKeyword !== '') {
      this.films  = this.allFilms.filter(res => {
          return res.title.toLowerCase().match(this.searchKeyword.toLowerCase()) || res.director.toLowerCase().match(this.searchKeyword.toLowerCase()) || res.producer.toLowerCase().match(this.searchKeyword.toLowerCase()) ;
      });
    } else if (this.searchKeyword === '') {
        this.page_no = 1;
        this.films = [];
        this.getFilmListing();
    }
  }
  sortBy(key) {
    this.searchKeyword = ''
    this.page_no = 0;
    this.order = !this.order;
    this.orderedBy = key;
    this.allFilms = JSON.parse(localStorage.getItem('all_films'));
    if (this.order){
      this.films = this.allFilms.sort((a, b) => b[key] - a[key]);
    } else {
      this.films = this.allFilms.sort((a, b) => a[key] - b[key]);

    }



  }

}
