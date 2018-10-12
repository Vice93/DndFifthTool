import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../../filters/filter.pipe';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  searchText = '';
  noResults = '';
  imgSrc = '/assets/img/';
  data = [];
  results = [];
  toggleValue = 'classes';
  loading = false;
  foundResults = false;

  ngOnInit() {
    this.getData();
  }

  loadImage(name) {
    switch (this.toggleValue) {
      case 'spells':
        return this.imgSrc + 'spells.png';
      case 'skills':
      case 'races':
      case 'classes':
        return this.imgSrc + name.toLowerCase() + '.png';
      default:
        return this.imgSrc + 'skills.png';
    }
  }

  getData() {
    this.loading = true;
    this.results = [];
    this.api.sendRequestAll(this.toggleValue).subscribe(res => {
      this.searchText = '';
      if (res['count'] !== 0) {
        this.foundResults = true;
        this.data = res;
        this.results = res['results'];
      } else {
        this.foundResults = false;
        this.noResults = 'Found no results.';
      }
      this.loading = false;
    });
  }
}
