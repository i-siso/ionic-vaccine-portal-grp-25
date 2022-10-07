import { Component, OnInit } from '@angular/core';
import { ViewWillEnter, ViewDidEnter, ViewWillLeave} from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  profile: any
  imgUrl

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getProfile()
  }

  async getProfile(){
    const res = await this.userService.getProfileInfo()
    this.profile = res
    this.imgUrl = this.profile.avatar ? `http://140.238.171.33/api/files/profiles/${this.profile.id}/${this.profile.avatar}` : null
    console.log(this.profile)
  }

  logout() {
    this.userService.logout()
  }

}
