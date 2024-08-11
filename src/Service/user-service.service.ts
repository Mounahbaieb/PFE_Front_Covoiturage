import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private conducteurInfo: any;

  setConducteurInfo(info: any) {
    this.conducteurInfo = info;
  }

  getConducteurInfo() {
    return this.conducteurInfo;
  }
}