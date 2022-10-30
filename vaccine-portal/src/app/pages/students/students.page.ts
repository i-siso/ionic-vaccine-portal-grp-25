import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ViewWillEnter } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UserService } from 'src/app/services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements ViewWillEnter, OnInit{

  records = [];
  // table paginations & sorting
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // modal for adding a student
  @ViewChild(IonModal) modal: IonModal;
  studentForm: FormGroup

  displayedColumns = [ 'name','age' ,'vaccinated' ];
  dataSource: MatTableDataSource<UserData>;
  myplaceHolder: string = 'Filter'
  boolData: boolean = false;

  checkPlaceHolder() {
    if (this.myplaceHolder) {
      this.myplaceHolder = null
      return;
    } else {
      this.myplaceHolder = 'Filter'
      return
    }
  }

  constructor(private userService: UserService, 
    private formBuilder: FormBuilder) { }
    ngOnInit(): void {
      this.studentForm = this.formBuilder.group({
        name: ["", [Validators.required]],
        age: ["", [Validators.required,Validators.min(1)]],
        vaccinated: ["", [Validators.required]]
      });
    }

  ionViewWillEnter() {
     this.getStudents();
  }
 

  async getStudents(){
    this.records = await this.userService.getRecordList('students', true, '', '' );
    this.dataSource = new MatTableDataSource(this.records);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.records)
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  // adding a student logic here
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.studentForm.value, 'confirm');
  }

  async onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data);
      this.studentForm.reset()
      await this.userService.createRecord('students', ev.detail.data, 'created_by')
      this.getStudents();

    }
  }


  
}


export interface UserData {
  name: string;
  age: string;
  vaccinated: boolean;
}