import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.page.html',
  styleUrls: ['./bookdetails.page.scss'],
})
export class BookdetailsPage implements OnInit {
  record = null
  constructor(private userService: UserService, private router: ActivatedRoute) { }

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id')!;
    this.getRecordDetails(id)
  }

  async getRecordDetails(id) {
    this.record = await this.userService.getRecordInfo('vaccinedrive', id);
    console.log(this.record)
  }

}
