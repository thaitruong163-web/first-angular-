import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';

const DUMMY_HTTP = 'https://dummyjson.com/comments';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) { }

  getByProductId(productId: number): Observable<Comment[]> {
    return this.http.get<any>(`${DUMMY_HTTP}/post/${productId}`).pipe(
      map(res => res.comments || res || [])
    );
  }

  postComment(productId: number, body: string, username: string): Observable<Comment> {
    return this.http.post<any>(`${DUMMY_HTTP}/add`, {
      body,
      postId: productId,
      user: { username }
    }).pipe(map(res => res));
  }
}
