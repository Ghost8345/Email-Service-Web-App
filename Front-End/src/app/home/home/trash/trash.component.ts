import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/login/login/login.component';
import { EmailI } from '../home.component';
import { InboxComponent } from '../inbox/inbox.component';
import { InboxService } from '../inbox/inbox.service';
import { TrashService } from './trash.service';
import { HomeComponent } from '../home.component';
import { inject } from '@angular/core/testing';
import $ from "jquery"


@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  public static listOfEmails : EmailI[] 
  private viewArray : string[][] 
  private listPreSize : number
  private iterationsNum : number
  private listOfButtons : NodeList

  constructor(private serveMe1: InboxService, private serveMe2: TrashService, private placer : InboxComponent  ) { 
    TrashComponent.listOfEmails = []
    this.viewArray = []
    this.listPreSize = this.viewArray.length
    this.iterationsNum = 5
    HomeComponent.pageIndicator = "Trash"
  }

  ngOnInit(): void {
    var x : EmailI = {
      senderUsername: 'Joe',
      timeSent: "27/9/2001",
      subject: "birthday",
      body: '',
      owner: '',
      recievers: ["Meniem", "Ray"],
      emailID: '',
      emailType: 'Recieved',
      priority: 'Urgent'
    }
    var y : EmailI = {
      senderUsername: 'Meniem',
      timeSent: "4/6/2001",
      subject: "birthday",
      body: '',
      owner: '',
      recievers: ["Deffo", "Joe"],
      emailID: '',
      emailType: 'Recieved',
      priority: 'Important'
    }
    var Z : EmailI = {
      senderUsername: "otb",
      timeSent: "هيخو",
      subject: "birthday",
      body: '',
      owner: '',
      recievers: ["Meniem", "Joe"],
      emailID: '',
      emailType: 'Sent',
      priority: 'Non-essential'
    }
    var w : EmailI = {
      senderUsername: "deffo",
      timeSent: "لول",
      subject: "birthday",
      body: '',
      owner: '',
      recievers: ["Otb", "Meniem"],
      emailID: '',
      emailType: 'Sent',
      priority: 'Skipable'
    }

    TrashComponent.listOfEmails.push(x)
    TrashComponent.listOfEmails.push(y)
    TrashComponent.listOfEmails.push(Z)
    TrashComponent.listOfEmails.push(w)

    // this.serveMe1?.getEmails(LoginComponent.globalUsername).subscribe((data : EmailI[])=> {TrashComponent.listOfEmails = data; console.log(TrashComponent.listOfEmails);});
    this.listPreSize  = this.viewArray.length

    this.parseArray()
    this.placer.place(this.viewArray,this.iterationsNum,this.listPreSize,"Restore")
    this.listOfButtons = document.querySelectorAll("td  > button")

    this.checkClick()
}
parseArray(){
  for (let email=0; email < TrashComponent.listOfEmails.length;email++){
    this.viewArray[email] = [] 
    let isSent = TrashComponent.listOfEmails[email].emailType
    this.viewArray[email][0] = isSent
    if (isSent == "Sent" || isSent == "sent")
      this.viewArray[email][1] = TrashComponent.listOfEmails[email].senderUsername
    else
      this.viewArray[email][1] = TrashComponent.listOfEmails[email].recievers.toString()
    this.viewArray[email][2] = TrashComponent.listOfEmails[email].timeSent
    this.viewArray[email][3] = TrashComponent.listOfEmails[email].subject

  }
}
checkClick(){
  for (var i =  0 ; i < this.listOfButtons.length ; i++){

    if (i%2){
      this.listOfButtons[i].addEventListener("click",$.proxy(this.deleteClicked,this));
    }else{
      this.listOfButtons[i].addEventListener("click",$.proxy(this.restoreClicked,this));
    }
    
  }
}

deleteClicked(e: any){
  try{
  //   const buttonNum = parseInt(e.target.id)
  //     this.serveMe1?.delete(this.serveMe1.loginUsername,TrashComponent.listOfEmails[(buttonNum-1)/2]).subscribe((data : EmailI[])=> {
  //       TrashComponent.listOfEmails = data; 
  //       console.log(TrashComponent.listOfEmails);
  //   this.listPreSize = this.viewArray.length
  //   this.parseArray()
  //   this.placer.place(this.viewArray,this.iterationsNum,this.listPreSize,"Restore")
  // });
  }catch (error){
    console.log(error)
  }
}
  restoreClicked(e: any){
    try{
      // const buttonNum = parseInt(e.target.id)
      // this.serveMe2?.restore(this.serveMe2.loginUsername,TrashComponent.listOfEmails[buttonNum/2]).subscribe((data : EmailI)=> {var email = data; console.log(TrashComponent.listOfEmails);
      //     });
    }catch (error){
      console.log(error)
    }
  }

}
