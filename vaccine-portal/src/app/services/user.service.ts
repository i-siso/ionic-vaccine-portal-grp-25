import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import PocketBase from "pocketbase";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private client = new PocketBase("http://140.238.171.33");

  private _authResult$ = new BehaviorSubject<string>(this.client.authStore?.model?.id);

  constructor(private router: Router) { }

  async getAuthMethods() {
    try {
      const res = await this.client.users.listAuthMethods()
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  isAuthenticated(): boolean {
    const isAuth = this.client.authStore.isValid
    console.log(isAuth)
    if (isAuth)
      return true
    return false
  }

  async getProfileInfo() {
    const user = await this.client.users.getOne(this.authResult);
    return user.profile
  }

  async authenticateUser(username, password) {
    try {
      const res = await this.client.users.authViaEmail(username, password)
      console.log(res)
      console.log(this.client.authStore)
      this._authResult$.next(res.user.id)
      this.router.navigate(['/home'])
      return res
    } catch (error) {
      throw error
    }
  }

  logout() {
    try {
      this.client.authStore.clear()
      this._authResult$.next(null)
      this.router.navigate(['/login'])
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  // async getProfileProperties(){
  //   this.client.records
  // }

  async createUser(email, password, confirmPassword) {
    try {
      const user = await this.client.users.create({
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
      });
      return user
    } catch (error) {
      throw error
    }

  }

  async getRecordList(collectionname, all = false, sortby, filterby, page?, pageNo?) {
    let recordList
    let options = { sort: sortby, filter: filterby }
    console.log(options)
    if (!all) {
      recordList = await this.client.records.getList(collectionname, page, pageNo, options)
    } else {
      // alternatively you can also fetch all records at once via getFullList:
      recordList = await this.client.records.getFullList(collectionname, 200 /* batch size */, options);
    }
    console.log(recordList)
    return recordList;
  }

  async getRecordInfo(type, id, expand ={}) {
    let record
    record = await this.client.records.getOne(type ,id, expand);
    return record;
  }

  async createRecord(type, data, userreq =null) {
    if(userreq)
      data[userreq]= this.authResult
    let record
    record = await this.client.records.create(type, data);
    return record;
  }



  get authResult$(): Observable<string> { return this._authResult$; }
  get authResult(): string { return this._authResult$.getValue(); }
  set authResult(value: string) { this._authResult$.next(value); }

}
