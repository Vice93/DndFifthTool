import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  image = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let name = this.route.snapshot.queryParams['class'].toLowerCase();
    this.image = '/assets/img/' + name +'.png'
  }

}
