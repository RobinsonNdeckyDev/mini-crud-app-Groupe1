import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProduitComponent } from './composants/gestion-produit/gestion-produit.component';
import { AuthComponent } from './composants/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo : 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: AuthComponent},
  { path: 'gestion/:id', component: GestionProduitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
