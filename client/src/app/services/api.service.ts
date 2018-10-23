import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  dnd5thDomain = 'http://www.dnd5eapi.co/api/';
  domain = 'http://localhost:8080/';

  getUrlWithType(type) {
    if(type == null) return this.dnd5thDomain + 'classes/';
    return this.dnd5thDomain + type + '/';
  }

  getUrlWithClass(className) {
    return this.dnd5thDomain + 'classes/' + className;
  }

  sendRequestAll(type) {
    const url = this.getUrlWithType(type);
    return this.http.get<any[]>(url, this.createHeaders()).pipe(map(res => res));
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Max-Age': '1728000'
      })
    };
  }

  getLevel(className){
    let url = this.getUrlWithClass(className) + '/levels';
    return this.http.get<any>(url, this.createHeaders()).pipe(map(res => res));
  }

  getClass(className) {
    let url = this.getUrlWithClass(className);
    return this.http.get<any>(url, this.createHeaders()).pipe(map(res => res));
  }

  getStartingEquip(url) {
    return this.http.get<any>(url, this.createHeaders()).pipe(map(res => res));
  }

  getSpells(classIndex){
    return this.http.get<any>(this.domain + 'api/getSpellMap?classIndex=' + classIndex).pipe(map(res => res));
  }

  populateDbWithSpellClassMap(spells){
    let resArray = [];
    for(let i = 0; i<spells.length; i++) {
      let url = spells[i]['url'];
      this.http.get<any[]>(url, this.createHeaders()).subscribe(spell => {
        for(let j = 0; j<spell['classes'].length; j++) {
          let object = {
            spellIndex: spell['index'],
            spellname: spell['name'],
            classIndex: spell['classes'][j]['url'].split('/classes/').pop(),
            classname: spell['classes'][j]['name'],
            level: spell['level']
          }
          this.http.post('http://localhost:8080/api/mapSpellToDb', object).subscribe(res => {
            resArray.push(res);
          });
        }
      });
    }
    return resArray;
  }
}
