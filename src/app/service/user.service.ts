import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public findAll(){
    return this.http.get<any[]>('http://localhost:8080/user');
  }
  public create(user:User){
      return this.http.post('http://localhost:8080/user', user);
  }
}
