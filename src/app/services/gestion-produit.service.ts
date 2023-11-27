import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionProduitService {

  constructor(private http: HttpClient) { }

  private urlProduit = "http://[::1]:3000";

  getProduits(){
    return this.http.get<any[]>(`${this.urlProduit}/produits`);
  }

  // Méthode pour l'ajout d'un produit
  postProduit(produit: Object){
    return this.http.post(`${this.urlProduit}/produits`,produit)
  }

}
