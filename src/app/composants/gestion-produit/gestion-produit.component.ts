import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionProduitService } from 'src/app/services/gestion-produit.service';

@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css']
})
export class GestionProduitComponent implements OnInit {

   
  // Gestion bouton
  boutonActif = 1;
  tabProduits: any;
  // idUser: number;
  produitsUserId: any[] = [];
  produits: any;

  nomProduit: string = "";
  imageProduit: string = "";
  prixProduit: string = "";
  descProduit: string = "";

  objetProduit: any;



  currentContent: string = 'listeProduits'; // Initialiser le contenu actuel

  showContent(contentId: string): void {
    this.currentContent = contentId; // Mettre à jour le contenu actuel
  }

  constructor(private produitService: GestionProduitService, private route: ActivatedRoute){ }

  // Attribut qui permet de récupérer l'identifiant de celui qui s'est connecté 
  idUserConnect = parseInt(this.route.snapshot.params['id']);


  ngOnInit(): void {
        this.produitService.getProduits().subscribe((data) =>{
        this.produits = data;
        // test
        console.log(this.produits);

        if(!localStorage.getItem("tabProduits")){
            localStorage.setItem("tabProduits", JSON.stringify(this.produits));
        }

        this.tabProduits = JSON.parse(localStorage.getItem("tabProduits") || "");
        console.log(this.tabProduits);

        console.log(this.idUserConnect);
        console.log(this.tabProduits[0]);

        this.recupProduitsUser();

        // test
        // console.log(this.produitsUserId);
        // console.log(typeof(this.idUserConnect));
        
     })
  }

  recupProduitsUser(){
    // Filtrer les produits de l'utilisateur connecté
    this.produitsUserId = this.tabProduits.filter((produit?:any) => produit?.idUser === this.idUserConnect);
  }
  


  // Méthode pour l'ajout d'un produit
  ajoutProduit(){
      let lastProduitId= this.tabProduits[this.tabProduits.length - 1].id
      console.log(lastProduitId);

      if(this.nomProduit && this.prixProduit){
        let produit= {
          id: lastProduitId + 1,
          idUser: this.idUserConnect,
          nomProduit: this.nomProduit,
          etaProduit: 1,
          description: this.descProduit,
          imageUrl: this.imageProduit,
          prix: this.prixProduit
        }

        console.log(produit);
        this.produitService.postProduit(produit).subscribe((data) => {
          this.tabProduits.push(data)
          localStorage.setItem("tabProduits", JSON.stringify(this.tabProduits))
          // console.log(this.tabProduits);
          this.recupProduitsUser();
        })
      }
  }
}
