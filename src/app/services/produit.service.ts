import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule,} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private url= "http://[::1]:3000";
  
  constructor(private http: HttpClient) { }


  getProduits(){
    return this.http.get<any[]>(`${this.url}/produits`);
  }
}
