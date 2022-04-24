import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SwiperOptions } from 'swiper';
import { debounceTime } from "rxjs/operators";
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

declare var ContactsX: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public contactsList = [];
  public selectedContact = [];
  public searchQuery: String = '';
  public searchResult: any;
  public config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 10,
  };

  constructor(public platform: Platform,
    public router: Router,
    public shared: SharedService
  ) { }

  ngOnInit() {
    this.loadContacts();
  }

  public get isIOS() {
    return this.platform.is('ios');
  }



  onSlideChange() {
    console.log('onSlideChange');
  }
  async loadContacts() {
   await ContactsX.hasPermission((success) => {
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
        resolve(success.read);
      }, (error) => {
        console.error(error);
      });
    });
  }
  async findContacts() {
   await ContactsX.find((success) => {
      this.contactsList = success;
      this.searchResult = this.contactsList
    }, (error) => {
      console.error(error);
    }, {
      fields: {
        phoneNumbers: true
      },
    });
  }
  getSelcetdContcat() {
    this.selectedContact = this.contactsList.filter(c => {
      return c.checked;
    })
  }
  delete(id) {
    this.selectedContact = this.selectedContact.filter(c => {
      if (c.id == id) {
        c.checked = false;
      }
      return c.id != id;
    })
  }
  selectAll() {
    this.contactsList.forEach(element => {
      element.checked = true;
    });
  }

  UnselectAll() {
    this.contactsList.forEach(element => {
      element.checked = false;
    });
  }

  filterItems() {
    this.searchResult = this.contactsList.filter((item) => {
      return item.displayName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
    });
  }
  goToCompletePage() {
    this.shared.selectedContact = this.selectedContact;
    this.shared.contactsList = this.contactsList;
    this.router.navigate(['/complete-group'])
  }
}
