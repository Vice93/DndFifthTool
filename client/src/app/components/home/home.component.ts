import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../../filters/filter.pipe';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

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

        //this gets all spells and posts them in the db
        // if(this.toggleValue == 'spells'){
        //   this.api.populateDbWithSpellClassMap(this.results);
        // }
      } else {
        this.foundResults = false;
        this.noResults = 'Found no results. This is probably because dnd5eapi.co is down.';
      }
      this.loading = false;
    });
  }

  navigateLearn(name){
    switch(this.toggleValue) {
      case 'classes':
        this.router.navigate(['/learn'], { queryParams: {
          class: name }
        });
        break;
    }

  }

}
