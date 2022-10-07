import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  spinnerMsg = "";
  toastMsg = "";
  todo: FormGroup;
  disableInput = false;
  toast;
  spinner;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastController: ToastController, private loadingController: LoadingController) { }

  ngOnInit(): void {
    this.todo = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  async logForm() {
    this.disableInput = true
    this.spinnerMsg = "Creating user"
    await this.showLoading();
    console.log(this.todo.value)
    try {
      const user = await this.userService.createUser(this.todo.get('email').value, this.todo.get('password').value, this.todo.get('password').value)
      if (user) {
        console.log(user)
        this.disableInput = false
      } else {
        console.error("Invalid request")
        this.disableInput = false
      }
    } catch (error) {
      let msg = "Error"
      console.log(error)
      if (error.data?.data?.email) {
        msg = error.data?.data?.email.message
      } else if (error.data?.data?.password) {
        msg =  error.data?.data?.password.message
      } else if(error.data){
        msg = error.data?.message
      } else {
        msg = error.message
      }
      this.disableInput = false
      this.toastMsg = msg
      this.presentToast()
    }
    this.spinner.dismiss()


  }

  async presentToast() {
    this.toast = await this.toastController.create({
      message: this.toastMsg,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });

    await this.toast.present();
  }

  async showLoading() {
    this.spinner = await this.loadingController.create({
      message: this.spinnerMsg,
      cssClass: 'custom-loading',
    });

    this.spinner.present();
  }


}
