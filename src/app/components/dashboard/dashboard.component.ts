import { Component, OnInit } from '@angular/core';
import { DataService, Skill } from '../../services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: Data
  skills: Skill[]

  constructor(
    private _data: DataService,
  ) {
    this._data.data$.subscribe(data => {
      this.data = data
      this.skills = data.skills
    })
  }

  ngOnInit() {
  }

  createSkill() {
    const skillName: string = prompt('New skill name:')
    if (skillName.trim()) {
      this._data.addSkill(skillName.trim())
    }
  }

  removeSkill(skill: Skill) {
    this._data.removeSkill(skill.id)
  }

  addSkillRecord(skill: Skill) {

  }

}
