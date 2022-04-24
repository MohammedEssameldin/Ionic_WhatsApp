import { SwiperOptions } from 'swiper';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';
import { ActionSheetController } from '@ionic/angular';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-group',
  templateUrl: './complete-group.page.html',
  styleUrls: ['./complete-group.page.scss'],
})

export class CompleteGroupPage implements OnInit {
  charsAllowed = 25;
  charsUsed = 0;
  groupName = new FormControl("", Validators.maxLength(this.charsAllowed));

  public contactsList = [];
  public selectedContact = [];
  public config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 10,
  };
  public img: String;

  constructor(
    public shared: SharedService,
    public camera: Camera,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,

  ) {
    this.contactsList = shared.contactsList;
    this.selectedContact = shared.selectedContact;

  }


  ngOnInit(): void {
    this.groupName.valueChanges.pipe()
      .subscribe((nv: string) => this.charsUsed = nv.length);
  }

  async presentPhotoAction() {


    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose',
      buttons: [
        {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  takePicture(sourceType) {
    const options = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
    };
    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      this.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }
  goToChatPage() {
    this.shared.groupName = this.groupName.value;
    this.shared.groupImg = this.img;
    this.router.navigate(['/chat-detail'])
  }

}
