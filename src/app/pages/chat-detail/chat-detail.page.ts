import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonItemSliding } from '@ionic/angular';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { debounceTime, map, skipWhile, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {
  public groupData:any={};

  constructor(public shared:SharedService) {
    this.groupData.groupName = this.shared.groupName;
    this.groupData.groupImg = this.shared.groupImg;
    this.groupData.groupMember =this.shared.selectedContact;
    console.log(this.groupData , ' this.groupData');
  }


  ngOnInit() {
    
    
  }
}
