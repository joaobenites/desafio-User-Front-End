import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/user';
  }

  public findAll():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:8080/user');
  }

  public create(user:User){
      return this.http.post('http://localhost:8080/user', user);
  }
  public update(user:User){
    return this.http.post('http://localhost:8080/user/update', user);
}
  public delete(user:User){
    console.log(user.id)
    return this.http.get('http://localhost:8080/user/delete?id='+user.id);
  }
}
