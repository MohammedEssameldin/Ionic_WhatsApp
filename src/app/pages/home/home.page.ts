import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SwiperOptions } from 'swiper';
import { debounceTime } from "rxjs/operators";

declare var ContactsX: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public contactsList=[];
  public selectedContact=[];
  public searchQuery:String ='';
  public searchResult;
  constructor(private platform: Platform,
  ) { }

  ngOnInit() {
    this.loadContacts();
  }

  public get isIOS() {
    return this.platform.is('ios');
  }

  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 10,
  };

  onSlideChange() {
    console.log('onSlideChange');
  }
  loadContacts() {
    console.log('loadContacts');
    ContactsX.hasPermission((success) => {
      console.log(success);
      if (!success.read) {
        this.requestPermission().then(res => {
          if (res) {
            this.findContacts()
          }
        })
      } else {
        this.findContacts()
      }
    }, (error) => {
      console.error(error);
    });

  }
  public requestPermission(): Promise<boolean> {
    return new Promise((resolve) => {
      ContactsX.requestPermission((success) => {
        console.log(success);
        resolve(success.read);
      }, (error) => {
        console.error(error);
      });
    });
  }
  findContacts() {
    ContactsX.find((success) => {
      console.log(success);
      this.contactsList = success;
      this.searchResult = this.contactsList 
      console.log('contacts', this.contactsList);
      
    }, (error) => {
      console.error(error);
    }, {
      fields: {
        phoneNumbers: true
      },
    });
  }
  getSelcetdContcat(){
    console.log('getSelcetdContcat',this.contactsList);
    
     this.selectedContact = this.contactsList.filter(c=>{
      return c.checked;
    })
    console.log(this.selectedContact);
    

  }
  delete(id){
    this.selectedContact = this.selectedContact.filter(c=>{
      if(c.id == id){
        c.checked = false;
      }
      return c.id != id;
    })
  }
  selectAll(){
    this.contactsList.forEach(element => {
      element.checked = true;
    });
  }

  UnselectAll(){
    this.contactsList.forEach(element => {
      element.checked = false;
    });
  }

  filterItems(){ 
    console.log('filterItems');
    
    this.searchResult = this.contactsList.filter((item) => {
      console.log(item);
            console.log(this.searchQuery);

      console.log(item.displayName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1)
        return item.displayName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
    });     
  }
}
