import { Component, OnInit } from '@angular/core';
import { EmailI, HomeComponent } from '../home.component'
import { InboxService } from './inbox.service';
import $ from "jquery"
import { LoginComponent } from 'src/app/login/login/login.component';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})




export class InboxComponent implements OnInit {
  public static listOfEmails : EmailI[]
  private viewArray : string[][]
  private listPreSize : number
  private iterationsNum : number
  private listOfButtons : NodeList


  constructor(private serveMe: InboxService) {
    InboxComponent.listOfEmails = []
    this.viewArray = []
    this.listPreSize = this.viewArray.length
    this.iterationsNum = 5
    HomeComponent.pageIndicator = "Inbox"
  }

  ngOnInit(): void {
    // var x : EmailI = {
    //   senderUsername: "Hesisenberg",
    //   timeSent: "27/9/2001",
    //   subject: "3azama",
    //   body: "I am not in Danger Skyler. I am the danger !!!!",
    //   owner: '',
    //   receiversUsernames: ['Skyler'],
    //   emailID: '',
    //   emailType: '',
    //   priority: 'Crucial'
    // }
    // var y : EmailI = {
    //   senderUsername: "Meniem",
    //   timeSent: "4/6/2001",
    //   subject: "rap",
    //   body: "I'm about to go HAM. Hard as a motherfucker, let these niggas know who I am",
    //   owner: '',
    //   receiversUsernames: [''],
    //   emailID: '',
    //   emailType: '',
    //   priority: 'Important'
    // }

    // var z : EmailI = {
    //   senderUsername: "Qotb",
    //   timeSent: "هيخو",
    //   subject: "birthday",
    //   body: '',
    //   owner: '',
    //   receiversUsernames: [''],
    //   emailID: '',
    //   emailType: '',
    //   priority: 'standard'
    // }
    // var w : EmailI = {
    //   senderUsername: "Deffo",
    //   timeSent: "لول",
    //   subject: "birthday",
    //   body: '',
    //   owner: '',
    //   receiversUsernames: [''],
    //   emailID: '',
    //   emailType: '',
    //   priority: 'Skippable'
    // }

    // InboxComponent.listOfEmails.push(x)
    // InboxComponent.listOfEmails.push(y)
    // InboxComponent.listOfEmails.push(z)
    // InboxComponent.listOfEmails.push(w)
    console.log("ng on Init called")
    this.serveMe.getInbox(LoginComponent.globalUsername).subscribe((data : EmailI[])=> {
      InboxComponent.listOfEmails = data;
      console.log(InboxComponent.listOfEmails);
      this.listPreSize = this.viewArray.length;
      this.parseArray();
      this.place(this.viewArray,this.iterationsNum,this.listPreSize);
      this.listOfButtons = document.querySelectorAll("td  > button");
      this.checkClick();});
}

parseArray(){
  console.log("In PARSE")
  console.log(InboxComponent.listOfEmails)
  for (let email=0; email < InboxComponent.listOfEmails.length;email++){
    console.log("In Loop")
    this.viewArray[email] = []
    this.viewArray[email][0] = InboxComponent.listOfEmails[email].senderUsername
    this.viewArray[email][1] = InboxComponent.listOfEmails[email].timeSentString
    this.viewArray[email][2] = InboxComponent.listOfEmails[email].subject
    this.viewArray[email][3] = InboxComponent.listOfEmails[email].priority
    console.log("View Array")
    console.log(this.viewArray)
  }
}

sortInbox(input : EmailI[]){

  InboxComponent.listOfEmails = input;
  this.parseArray();
  this.listPreSize = this.viewArray.length;
  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();

}
filterInbox(input : EmailI[]){

  InboxComponent.listOfEmails = input;
  if(input.length != 0){
    this.parseArray();
  }
  else{
    this.viewArray = [];
  }
  this.listPreSize = this.viewArray.length;
  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();

}

searchInbox(input : EmailI[]){

  InboxComponent.listOfEmails = input;
  this.parseArray();
  this.listPreSize = this.viewArray.length;
  this.place(this.viewArray,this.iterationsNum,this.listPreSize);
  this.listOfButtons = document.querySelectorAll("td  > button");
  this.checkClick();

}




place(viewArray : string[][],iterationsNum : number,listPreSize: number,btnName: string = "Show"){
        var body = document.getElementById("mybody")
        var buttonCount = 0
        for (let i=0;i<listPreSize;i++){
          body?.removeChild(body?.childNodes[0])
        }
        console.log(viewArray)
        for (let i=0;i<viewArray.length;i++){
          var node = document.createElement("tr");
          node.style.width = "300px"
          node.style.textAlign = "center"
          node.style.padding = "7px"
          node.style.margin = "50px"
          for (let j=0;j<iterationsNum;j++){
              var node2 = document.createElement("td");
              if (j!=iterationsNum-1){
                var textNode = document.createTextNode(viewArray[i][j]);
                node2.appendChild(textNode);
              }else{
                if (btnName!="Delete"){
                  var node3 = document.createElement("button");
                  node3.style.marginRight = "5px"
                  var textNode = document.createTextNode(btnName);
                  node3.appendChild(textNode);
                  node3.type = "button";
                  node3.id = (buttonCount).toString()
                  node2.appendChild(node3);
                  buttonCount++
                }
                var textNode2 = document.createTextNode("Delete");
                var node4 = document.createElement("button");
                node4.style.marginRight = "5px"
                node4.appendChild(textNode2);
                node4.type = "button";
                node4.id = (buttonCount).toString()
                node2.appendChild(node4);
                buttonCount++
              }
              node.appendChild(node2);
          }
          document.getElementById("mybody")?.appendChild(node);
      }
    }


      checkClick(){
    for (var i =  0 ; i < this.listOfButtons.length ; i++){

      if (i%2){
        this.listOfButtons[i].addEventListener("click",$.proxy(this.deleteClicked,this));
      }else{
        this.listOfButtons[i].addEventListener("click",$.proxy(this.showClicked,this));
      }

    }
}


    closeEmailPopup(){
        (<HTMLElement>document.getElementById("email-popup")).style.display = "none";
    }

      show(email:EmailI){
        var contentsToBeDeleted = document.querySelectorAll("div > p");
        for (var i = 0; i<contentsToBeDeleted.length; i++)
        switch(i){
          case 0 : document.getElementById("sender-container")?.removeChild(document.getElementById("sender-container")?.childNodes[1])
                   break
          case 1 : document.getElementById("date-container")?.removeChild(document.getElementById("date-container")?.childNodes[1])
                   break
          case 2 : document.getElementById("subject-container")?.removeChild(document.getElementById("subject-container")?.childNodes[1])
                   break
          case 3 : document.getElementById("priority-container")?.removeChild(document.getElementById("priority-container")?.childNodes[1])
                   break
          case 4 : document.getElementById("message-container")?.removeChild(document.getElementById("message-container")?.childNodes[1])
                   break
        }
        var emailContents = document.querySelectorAll("div.email-container > div");
        for (var i = 0; i<emailContents.length; i++){
          var node = document.createElement("P")
          node.style.marginTop  = "0"
          var textNode = document.createTextNode(email.senderUsername)
          var destinationNode = document.getElementById("sender-container")
          switch(i){
            case 0 : node.id = "sender"
                    break
            case 1 : node.id = "date"
                    textNode = document.createTextNode(email.timeSentString)
                    destinationNode = document.getElementById("date-container")
                    break
            case 2 : node.id = "subject"
                    textNode = document.createTextNode(email.subject)
                    destinationNode = document.getElementById("subject-container")
                    break
            case 3 : node.id = "priority"
                    textNode = document.createTextNode(email.priority)
                    destinationNode = document.getElementById("priority-container")
                    break
            case 4 :
                    node.id = "message"
                    textNode = document.createTextNode(email.body)
                    destinationNode = document.getElementById("message-container")

                    break
          }
          node.appendChild(textNode)
          destinationNode?.appendChild(node)

        }


        (<HTMLElement>document.getElementById("email-popup")).style.display = "block";
    }

    deleteClicked(e: any){
      try{
        const buttonNum = parseInt(e.target.id)
        this.serveMe.movetoTrash(InboxComponent.listOfEmails[(buttonNum-1)/2]).subscribe((data : EmailI[])=> {
          location.reload()
          this.ngOnInit()
        })
      }catch (error){
        console.log(error)
      }
    }
      showClicked(e: any){
        try{
          console.log(InboxComponent.listOfEmails)
          const buttonNum = parseInt(e.target.id)
          console.log(InboxComponent.listOfEmails[0])
          this.show(InboxComponent.listOfEmails[buttonNum/2]);
        }catch (error){
          console.log(error)
        }
      }

}



  // checkClick(){
//     for (var i =  0 ; i < this.listOfButtons.length ; i++){

//       if (i%2){
//         this.listOfButtons[i].addEventListener("click", e =>{
//           this.serveMe.delete(this.serveMe.loginUsername,InboxComponent.listOfEmails[(i-1)/2]).subscribe((data : EmailI[])=> {
//             InboxComponent.listOfEmails = data;
//             console.log(InboxComponent.listOfEmails);
//             this.listPreSize = this.viewArray.length
//             this.parseArray()
//             this.place(this.viewArray,this.iterationsNum,this.listPreSize)
//           });
//         })
//       }else{
//         this.listOfButtons[i].addEventListener("click", e =>{
//           console.log(i)
//           console.log(InboxComponent.listOfEmails[i/2])
//           this.show(InboxComponent.listOfEmails[i/2]);
//         })

//       }

//     }
// }
