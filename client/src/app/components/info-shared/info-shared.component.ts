import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../../model/class';
import { Feature } from '../../model/feature';

@Component({
  selector: 'app-info-shared',
  templateUrl: './info-shared.component.html',
  styleUrls: ['./info-shared.component.css']
})
export class InfoSharedComponent implements OnInit {

  from = [
      {
          "name": "Skill: None"
      }
  ];

  classData = {
    "name": "None",
    "hit_die": 0,
    "proficiencies": [
        {
            "name": ""
        }
    ],
    "saving_throws": [
        {
            "name": ""
        }
    ],
    "subclasses": [
        {
            "name": ""
        }
    ]
  }

  levelData = [
    {
      "ability_score_bonuses": 0,
      "prof_bonus": 0,
      "spellcasting": {
        "cantrips_known": 0,
        "spells_known": 0,
        "spell_slots_level_1": 0
      },
      "class_specific": {
        "sorcery_points": 0,
        "metamagic_known": 0,
        "creating_spell_slots": []
      }
    }
  ];
  levels = [];
  features = [];
  selectedLevel = 1;
  choose = 0;
  proficiencies = [];
  spells = [];
  class;


  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.class = this.route.snapshot.queryParams['class'].toLowerCase();
    //get class
    this.api.getClass(this.class).subscribe(res => {
      if (res != null) {
        this.from = res['proficiency_choices'][0]['from'];
        this.choose = res['proficiency_choices'][0]['choose'];
        this.proficiencies = res['proficiencies'];
        this.classData = (res as Class);
        this.getSpellsAndMapToClass(this.classData['index']);
      }
    });

    //get level data
    this.api.getLevel(this.class).subscribe(res => {
      if (res != null) {
        this.levelData = res;
        for (let i in res) {
          this.levels.push(res[i]['level']);

          let feat: Feature[] = res[i]['features'];
          if(feat instanceof Array && feat.length > 0) {
            for (let j in feat) {
              feat[j].level = res[i]['level'];
              this.features.push(feat[j]);
              this.features.sort(this.compare);
            }
          }
        }
      }
    });
  }

  setLevel(index){
    this.selectedLevel = index + 1;
  }

  next() {
    if(this.selectedLevel < 20) {
      this.selectedLevel++;
    }
  }

  prev() {
    if(this.selectedLevel > 1) {
      this.selectedLevel--;
    }
  }

  getSpellsAndMapToClass(classIndex) {
    this.api.getSpells(classIndex).subscribe(res => {
      if(res != null) {
        this.spells = res['data'];
        this.spells.sort(this.compare);
      }
    });
  }

  compare(a,b) {
    if ((a.spellname < b.spellname) || (a.name < b.name))
      return -1;
    if ((a.spellname > b.spellname) || (a.name > b.name))
      return 1;
    return 0;
  }
}
