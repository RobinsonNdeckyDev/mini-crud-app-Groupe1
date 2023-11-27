import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) { }

  private url = "http://[::1]:3000";

  getUsers(){
    return this.http.get<any[]>(`${this.url}/users`);
  }
  
}
