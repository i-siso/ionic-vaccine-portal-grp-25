import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements ViewWillEnter{
  records = []
  constructor(private userService: UserService) { }
  ionViewWillEnter() {
    this.getStudents()
  }

  async getStudents(){
    this.records = await this.userService.getRecordList('students', true, '', '' )
    console.log(this.records)
  }

}
