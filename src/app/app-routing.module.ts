import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProduitsComponent } from './composants/gestion-produits/gestion-produits.component';
import { AuthComponent } from './composants/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo : 'connexion', pathMatch: 'full' },
  { path: 'gestion/:id', component: GestionProduitsComponent},
  { path: 'connexion', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
