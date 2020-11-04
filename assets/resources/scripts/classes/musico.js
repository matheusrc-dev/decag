'use strict';

class Musico {
  constructor(id, name, avatar, whatsapp, bio, instruments, cost) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.whatsapp = whatsapp;
    this.bio = bio;
    this.instruments = instruments;
    this.cost = cost;
    this.schedules = ['', '', '', '', '', '', '', ''];
  }

  addSchedule(schedule) {
    this.schedules.splice(schedule.weekdays, 1, schedule);
  }
}
