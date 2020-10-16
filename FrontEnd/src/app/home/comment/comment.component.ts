import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comments } from 'src/app/shared/model/comment.model';
import { CommentService } from 'src/app/shared/service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styles: [
  ]
})
export class CommentComponent implements OnInit {
  @Output() public viewPanelP: EventEmitter<number> = new EventEmitter();
  @Input("idPublication") idPublication: number;
  @Input("guidUser") idUser: string;

  listComments: Array<Comments> = [];
  comment: Comments = new Comments();
  objectUsers: any = {};

  viewBoton: boolean = true;
  fecha = new Date();
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  hour = this.fecha.getHours();
  minutes = this.fecha.getMinutes();

  constructor(private serviceC: CommentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList(1);
  }

  refreshList(id: any): void {
    this.serviceC.refreshList(id).subscribe((data: Array<Comments>) => {
      this.listComments = data.filter(c => c.idPublication == this.idPublication);
    });
    this.comment.commentary = "";
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.serviceC.deleteComment(Id)
        .subscribe(res => {
          this.serviceC.refreshList(this.idPublication);
          this.toastr.warning('Deleted successfully', 'Comment Deleted');
        },
          err => {
            this.toastr.error('Error', err);
          })
    }
  }

  insertRecord() {
    this.comment.idPublication = this.idPublication;
    this.comment.idUserPublishes = this.idUser;
    this.comment.date = this.fecha.toLocaleDateString("es-ES", this.options) + " " + this.hour + ":" + this.minutes;
    this.serviceC.postComment(this.comment).subscribe(
      res => {
        this.toastr.success('Submitted successfully', 'Comment Register');
        this.serviceC.refreshList(this.idPublication);
      },
      err => {
        this.toastr.error('Error', err);
      }
    )
  }

}
