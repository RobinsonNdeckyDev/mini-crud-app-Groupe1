import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // Nos attributs

  emailLogin: string = "";
  passwordLogin: string = "";

  users: any[] = [];
  userFound: any;

  constructor(private userService: UtilisateurService, private router: Router){}


  ngOnInit(): void {
        this.userService.getUsers().subscribe((data) =>{
        this.users = data;
        // test
        console.log(this.users);

        if(!localStorage.getItem("Utilisateurs")){
            localStorage.setItem('Utilisateurs', JSON.stringify(this.users));
        }
        
     })
  }


  connexion(){

    // EmailRegex
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if(this.emailLogin == ""){
      this.alertMessage("error", "Attention", "Veillez renseigner l'email");
    }else if(this.passwordLogin == "" ){
      this.alertMessage("error", "Attention", "Veillez renseigner le mot de passe");
    }else if(!this.emailLogin.match(emailPattern)){
      this.alertMessage("error", "Attention", "Veillez revoir votre email");
    }else if(this.passwordLogin.length < 5){
      this.alertMessage("error", "Attention", "Le mot de passe doit contenir plus de huit caractéres");
    
    }else{

      this.userFound = this.users.find((element: any) => element.email == this.emailLogin && element.password == this.passwordLogin)

      if(this.userFound){
        this.router.navigate(['gestion', this.userFound.id])
        this.alertMessage("success", "Bravo", "connexion réussie")

      }else{
        this.alertMessage("error", "Attention", "Ce compte n'existe pas")
      }
    }

    }


  // sweetAlert
  alertMessage(icon: any, title: any, text: any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      // timer: 1500
    });
  }

}
