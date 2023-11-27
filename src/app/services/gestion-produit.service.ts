import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionProduitService {

  constructor(private http: HttpClient) { }

  private urlProduit = "http://[::1]:3000";

  // Methode pour récupérer la liste des produits 
  getProduits(){
    return this.http.get<any[]>(`${this.urlProduit}/produits`);
  }

  // Méthode pour l'ajout d'un produit
  postProduit(produit: Object){
    return this.http.post(`${this.urlProduit}/produits`,produit)
  }


  // Methode pour modifier un article 
  updateProduit(postData: Object, id:number) {
    return this.http.put(`${this.urlProduit}/produits/${id}`, postData);
  } 

  // Methode pour supprimer un produit 
  deleteProduit(idProduit:number){
    return this.http.delete(`${this.urlProduit}/produits/${idProduit}`)
  }

}
