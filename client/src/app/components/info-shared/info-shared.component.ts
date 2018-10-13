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
  startingEquipment = [];
  class;


  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.class = this.route.snapshot.queryParams['class'].toLowerCase();
    let startingEquipUrl = '';
    //get class
    this.api.getClass(this.class).subscribe(res => {
      if (res != null) {
        this.from = res['proficiency_choices'][0]['from'];
        this.choose = res['proficiency_choices'][0]['choose'];
        this.proficiencies = res['proficiencies'];
        startingEquipUrl = res['starting_equipment']['url'];
        this.classData = (res as Class);
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
            }
          }
        }
        console.log(res);
      }
    });

    if(startingEquipUrl != '') {
      this.api.getStartingEquip(startingEquipUrl).subscribe(res => {
        if(res != null) {
          this.startingEquipment.push(res['starting_equipment'][0]);
          for (let i in res) {

          }
        }
      });
    }
  }

  setLevel(index){
    console.log(this.levelData);
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
}
