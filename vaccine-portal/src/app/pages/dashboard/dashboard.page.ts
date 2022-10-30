import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  students: any = null;
  vaccines: any = null;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getVaccinationSlots()
  }

  async getVaccinationSlots() {
    const dateNow = new Date().toISOString()
    const vaccineBooking = (await this.userService.getRecordList('vaccinedrive', false, null, null, 1, 1))
    const slotVaccinated = (await this.userService.getRecordList('vaccinedrive', false, null, `date <= "${dateNow}"`, 1, 1))
    if (slotVaccinated && vaccineBooking) {
      this.vaccines = {
        total: vaccineBooking.totalItems,
        done: slotVaccinated.totalItems
      }
    }

    const students = (await this.userService.getRecordList('students', false, null, null, 1, 1))
    const studentVaccinated = (await this.userService.getRecordList('students', false, null, "vaccinated = 'true'", 1, 1))
    if (students && studentVaccinated) {
      this.students = {
        total: students.totalItems,
        done: studentVaccinated.totalItems
      }
    }
  }

}
