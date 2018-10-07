import { Injectable } from '@angular/core'
import * as LocalForage from 'localforage'
import { BehaviorSubject } from 'rxjs'
import {v4} from 'uuid'

LocalForage.setDriver([LocalForage.INDEXEDDB, LocalForage.WEBSQL, LocalForage.LOCALSTORAGE])
LocalForage.config({
  // driver      : localforage.WEBSQL, // Force WebSQL same as using setDriver()
  name: 'stat-board',
  version: 1.0,
  // size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'stat-board',
  // description : 'some description'
})

export interface Skill {
  id: string,
  name: string,
}

export interface AppData {
  skills: Skill[],
}

const DATA_KEY = 'data'
const defaultDataState: AppData = {
  skills: [],
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _data: AppData = {...defaultDataState}
  private _data$ = new BehaviorSubject<AppData>(this._data)

  constructor() {
    this.updateData()
  }

  updateData() {
    return this.loadData()
    .then(data => {
      this._data = data,
      this._data$.next(this._data)
      return this._data
    })
  }

  loadData(): Promise<AppData> {
    return LocalForage.getItem(DATA_KEY)
    .then(data => data as AppData || {...defaultDataState})
    .catch(function (err) {
      console.error('data reading', err)
      return {...defaultDataState}
    })
  }

  saveData(data: AppData): Promise<AppData> {
    return LocalForage.setItem(DATA_KEY, data)
    .then(data => this.updateData())
  }

  get data$() {
    return this._data$.asObservable()
  }

  addSkill(name): Promise<AppData> {
    const newSkill = {
      id: v4(),
      name,
    }

    return this.loadData()
    .then(data => ({
      ...data,
      skills: [...data.skills, newSkill],
    }))
    .then(data => this.saveData(data))
  }

  removeSkill(skillId): Promise<AppData> {
    return this.loadData()
    .then(data => ({
      ...data,
      skills: data.skills.filter(s => s.id !== skillId),
    }))
    .then(data => this.saveData(data))
  }

}
