import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionProduitService } from 'src/app/services/gestion-produit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-produit',
  templateUrl: './gestion-produit.component.html',
  styleUrls: ['./gestion-produit.component.css']
})
export class GestionProduitComponent implements OnInit {

   
  // Gestion bouton
  boutonActif = 1;

  // idUser: number;
  tabProduitsUser: any[] = [];
  produits: any;

  nomProduit: string = "";
  imageProduit: string = "";
  prixProduit: string = "";
  descProduit: string = "";

  objetProduit: any;

  produitFound: any;



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

    this.recupProduitsUser();    
  })
  }

  recupProduitsUser(){
    // Filtrer les produits de l'utilisateur connecté
    this.tabProduitsUser = this.produits.filter((produit?:any) => produit?.idUser === this.idUserConnect);
  }
  


  // Méthode pour l'ajout d'un produit
  ajoutProduit(){
    let lastProduitId= this.produits[this.produits.length - 1].id;

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

      console.log(this.produits);
      this.produitService.postProduit(produit).subscribe((data) => {
        this.produits.push(data);
        this.recupProduitsUser();
      })
    }
  }

  // Modifier un produit 
  // Charger les informations du produit 
  chargerInfos(produit:any){
    this.produitFound = produit;
    this.nomProduit= produit.nomProduit;
    this.imageProduit= produit.imageUrl;
    this.prixProduit= produit.prix;
    this.descProduit= produit.description;
  }

  modifierProduit(){
    this.produitFound.nomProduit = this.nomProduit;
    this.produitFound.description = this.descProduit;
    this.produitFound.imageUrl = this.imageProduit;
    this.produitFound.prix = this.prixProduit;
    console.log(this.produitFound);

    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez mofier ce produit",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonColor: "#596235",
      cancelButtonColor: "#D96845",
      confirmButtonText: "Oui, je modifie!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitService.updateProduit(this.produitFound, this.produitFound.id).subscribe((data =>{
          // console.log(data)
        }))
      }
    });
  }

  // Methode pour supprimer un produit 
  supprimerProduit(produit:any){
    // console.log(this.produits);
    Swal.fire({
      title: "Etes-vous sur???",
      text: "Vous allez supprimer ce produit",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonColor: "#596235",
      cancelButtonColor: "#D96845",
      confirmButtonText: "Oui, je supprime!"
    }).then((result) => {

      if (result.isConfirmed) {
        this.produitService.deleteProduit(produit.id).subscribe((data =>{
          this.produits = this.produits.filter((element:any) => element.id !== produit.id);
          this.recupProduitsUser();
        }))
      }
    });
  }


}
