import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../../filters/filter.pipe';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  searchText = '';
  noResults = '';
  imgSrc = '/assets/placeholder.png';
  data = [];
  results = [];
  toggleValue = 'classes';

  ngOnInit() {
    this.getData();
  }

  getData() {

    this.api.sendRequestAll(this.toggleValue).subscribe(res => {
      this.searchText = '';
      if(res["count"] != 0) {
        this.data = res;
        this.results = res['results'];
      } else {
        this.noResults = 'Found no results.';
      }
    });
  }


  stub = [{
  	'count': 9,
  	'results': [
  		{
  			'name': 'Dwarf',
  			'url': 'http://www.dnd5eapi.co/api/races/1'
  		},
  		{
  			'name': 'Elf',
  			'url': 'http://www.dnd5eapi.co/api/races/2'
  		},
  		{
  			'name': 'Halfling',
  			'url': 'http://www.dnd5eapi.co/api/races/3'
  		},
  		{
  			'name': 'Human',
  			'url': 'http://www.dnd5eapi.co/api/races/4'
  		},
  		{
  			'name': 'Dragonborn',
  			'url': 'http://www.dnd5eapi.co/api/races/5'
  		},
  		{
  			'name': 'Gnome',
  			'url': 'http://www.dnd5eapi.co/api/races/6'
  		},
  		{
  			'name': 'Half-Elf',
  			'url': 'http://www.dnd5eapi.co/api/races/7'
  		},
  		{
  			'name': 'Half-Orc',
  			'url': 'http://www.dnd5eapi.co/api/races/8'
  		},
  		{
  			'name': 'Tiefling',
  			'url': 'http://www.dnd5eapi.co/api/races/9'
  		}
  	]
  }];
}
