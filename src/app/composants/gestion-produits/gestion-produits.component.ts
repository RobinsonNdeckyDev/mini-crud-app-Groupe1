import { Component } from '@angular/core';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-gestion-produits',
  templateUrl: './gestion-produits.component.html',
  styleUrls: ['./gestion-produits.component.css']
})
export class GestionProduitsComponent {

  produits: any[] = [];

  constructor(private produitService: ProduitService ){}


  ngOnInit(): void {
        this.produitService.getProduits().subscribe((data) =>{
        this.produits = data;
        // test
        console.log(this.produits);
     })
  }

}
