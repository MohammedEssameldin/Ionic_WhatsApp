import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public contactsList=[];
  public selectedContact=[];
  public groupName;
  public groupImg;

  constructor() { }
}
