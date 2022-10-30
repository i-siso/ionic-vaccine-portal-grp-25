import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { DateValidator } from '../book.page';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.page.html',
  styleUrls: ['./bookdetails.page.scss'],
})
export class BookdetailsPage implements OnInit {
  @Input() record: any = null;
  vaccineForm: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.vaccineForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      date: ["", [Validators.required, DateValidator.LessThanToday]],
      vaccinescount: ["", [Validators.required, Validators.min(0)]]
    });
    this.getRecordDetails()
  }

  async getRecordDetails() {
    this.vaccineForm.setValue({name: this.record.name, date: this.record.date.substring(0,10), vaccinescount: this.record.vaccinescount})
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.vaccineForm.value)
    return this.modalCtrl.dismiss(this.vaccineForm.value, 'confirm');
  }

}
