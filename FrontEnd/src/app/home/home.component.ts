import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/model/user.model';
import { UserService } from '../shared/service/user.service';
import { MyProfileComponent } from './my-profile/my-profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild(MyProfileComponent) myProfileComponent: MyProfileComponent;
  userDetails;
  panels: boolean = false;
  text: string = "My Profile";  
  idUser: string;
  idUserPublishes: string;
  public listUsers: any;
  user: User = new User;
  idPublication: number;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.service.getUsers().subscribe((data: any) => {
      this.listUsers = data;
    });
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        this.idUser = this.userDetails.id;
      },
      err => {
        console.log(err);
      },
    );
  }

  parent(id: any){
    if(id == 0){    
      this.panels = false;
      this.text = "My Profile";
    }else{
      this.text = "Comments"
      this.panels = true;
      this.idPublication = id;
    }
  }

  update(){
    this.user = this.listUsers.filter(u => u.id == this.idUserPublishes)[0]
    if(this.idUser == this.user.idUser){
      this.text = "My Profile"; 
    } else  {
      this.text = "Profile " + this.user.userName;
    }
    this.myProfileComponent.refreshListPublishes(this.user);    
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
