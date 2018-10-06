import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-form',
  templateUrl: './time-form.component.html',
  styleUrls: ['./time-form.component.scss']
})
export class TimeFormComponent implements OnInit {
  nowTime: Date
  fromTime: Date
  toTime: Date
  procent: number

  constructor() { }

  ngOnInit() {
    this.nowTime = new Date()
    this.fromTime = new Date(this.nowTime)
    this.fromTime.setHours(5)
    this.fromTime.setMinutes(0)
    this.fromTime.setSeconds(0)
    this.toTime = new Date(this.nowTime)
    this.toTime.setHours(21)
    this.toTime.setMinutes(0)
    this.toTime.setSeconds(0)

    this.recalculateProcent()
  }

  recalculateProcent() {
    this.procent = (+this.toTime - (+this.nowTime)) / (+this.toTime - (+this.fromTime))
    console.log(this.procent)
  }

  onFromTimeChange(time: Date) {
    this.fromTime = time
    this.recalculateProcent()
  }

  onToTimeChange(time: Date) {
    this.toTime = time
    this.recalculateProcent()
  }


}
