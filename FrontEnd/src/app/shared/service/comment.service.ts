import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comments } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  readonly rootURL = 'http://localhost:51358/api';

  constructor(private http: HttpClient) { }

  deleteComment(id) {
    return this.http.delete(this.rootURL + '/Comment/'+ id);
  }

  postComment(comment: Comments) {
    return this.http.post(this.rootURL + "/Comment/", comment);
  }

  refreshList(id: any){
    return this.http.get(this.rootURL + "/Comment");
  }

}
