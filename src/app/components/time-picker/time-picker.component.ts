import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  @Input() time: Date
  @Output() onChange = new EventEmitter<Date>()

  constructor() { }

  ngOnInit() {
  }

  addMinutes(minutes: number) {
    console.log(this.time)
    if (this.time) {
      const update = new Date(this.time.getTime())
      update.setMinutes(update.getMinutes() + minutes)
      console.log(update)
      this.onChange.emit(update)
    }
  }

}
