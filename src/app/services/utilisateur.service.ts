import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  private url = "http://[::1]:3000";

  getUsers(){
    return this.http.get<any[]>(`${this.url}/users`);
  }

}
