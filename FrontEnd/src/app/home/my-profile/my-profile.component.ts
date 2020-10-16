import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Publication } from 'src/app/shared/model/publication.model';
import { User } from 'src/app/shared/model/user.model';
import { PublicationService } from 'src/app/shared/service/publication.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styles: [
  ]
})
export class MyProfileComponent implements OnInit {
  @Input("guidUser") idUser: string;
  @Input("userPublishes") user: User;
  @Output() public viewPanel: EventEmitter<number> = new EventEmitter();

  publication: Publication = new Publication();
  listPublication: Array<Publication> = [];
  objectUsers: any = {};

  constructor(private serviceP: PublicationService, private service: UserService, private toastr: ToastrService) { }

  base64textString: String = "";
  view: boolean = false;
  viewBoton: boolean = true;
  fecha = new Date();
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  hour = this.fecha.getHours();
  minutes = this.fecha.getMinutes();

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      this.view = true;
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    if(Object.keys(this.user).length !== 0){
      if (this.user.idUser == this.idUser) {
        this.publication.idUser = this.idUser;
        this.publication.idUserPublishes = this.idUser;
      } else {
        this.publication.idUser = this.user.idUser;
        this.publication.idUserPublishes = this.idUser;
      }
    } else {
      this.publication.idUser = this.idUser;
      this.publication.idUserPublishes = this.idUser;
    }    
    this.publication.image = this.base64textString;
    this.publication.date = this.fecha.toLocaleDateString("es-ES", this.options) + " " + this.hour + ":" + this.minutes;
  }

  add() {
    this.serviceP.addPublication(this.publication).subscribe(
      res => {
        this.toastr.info('Successful Post', 'Added Post');
        if(Object.keys(this.user).length !== 0){
          if (this.user.idUser == this.idUser) {
            this.refreshList();
          } else {
            this.refreshListPublishes(this.user);
          }
        } else {
          this.refreshList();          
        }        
      },
      err => {
        this.toastr.error('Error', err);
      }
    )
  }

  addPrivate(publication) {
    publication.private = 1;
    this.serviceP.putPublication(publication).subscribe(
      res => {
        this.toastr.success('Successfully Added', 'Publication added to Private');
      },
      err => {
        this.toastr.error('Error', err);
      }
    )
  }

  addPublic(publication) {
    publication.private = 0;
    this.serviceP.putPublication(publication).subscribe(
      res => {
        this.toastr.success('Successfully Removed', 'Publication removed to Private');
      },
      err => {
        this.toastr.error('Error', err);
      }
    )
  }

  refreshList() {
    this.serviceP.refreshList().subscribe((data: Array<Publication>) => {
      this.listPublication = data.filter(u => u.idUser == this.idUser);
    });
    this.view = false;
    this.viewBoton = true;
    this.publication.description = "";
  }

  refreshListPublishes(user: User) {
    this.serviceP.refreshList().subscribe((data: Array<Publication>) => {
      this.listPublication = data.filter(u => u.idUser == user.idUser && u.private == 0);
    });
    this.view = false;
    this.viewBoton = false;
    this.publication.description = "";
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data: Array<User>) => {
      data.forEach((user) => {
        this.objectUsers[user.idUser] = user;
      });
    }); 
    this.refreshList();
  }

}
