import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
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

  constructor(private userService: UserService, private router: Router){}


  ngOnInit(): void {
        this.userService.getUsers().subscribe((data) =>{
        this.users = data;
        // test
        console.log(this.users);

        if(!localStorage.getItem("Utilisateurs")){
            localStorage.setItem('Utilisateurs', JSON.stringify(this.users));
        }

        console.log(this.emailLogin);
        
     })
  }


  connexion(){

    // EmailRegex
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if(this.emailLogin == ""){
      this.alertMessage("error", "Attention", "Veillez renseigner l'email", 2000);
    }else if(this.passwordLogin == "" ){
      this.alertMessage("error", "Attention", "Veillez renseigner le mot de passe", 2000);
    }else if(!this.emailLogin.match(emailPattern)){
      this.alertMessage("error", "Attention", "Veillez revoir votre email", 2000);
    }else if(this.passwordLogin.length < 5){
      this.alertMessage("error", "Attention", "Le mot de passe doit contenir plus de huit caractéres", 2000);
    
    }else{

      this.userFound = this.users.find((element: any) => element.email == this.emailLogin && element.password == this.passwordLogin)

      if(this.userFound){
        this.router.navigate(['gestion', this.userFound.id]);
        this.alertMessage("success", "Bravo", "connexion réussie", 2000);
      }else{
        this.alertMessage("error", "Attention", "Ce compte n'existe pas", 2000)
      }
    }

    }


  // sweetAlert
  alertMessage(icon: any, title: any, text: any, timer: 2000) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: timer
    });
  }

}
