// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: '/accueil',
        pathMatch: 'full'
      },
      {
        path: 'accueil',
        loadComponent: () => import('./demo/pages/authentication/login/login-page/login-page.component').then(m => m.LoginPageComponent)
      },
      {
        path: 'inscription',
        loadComponent: () => import('./demo/pages/authentication/login/inscription/inscription.component').then(m => m.InscriptionComponent)
      },
      {
        path: 'auth/signup',
        loadComponent: () => import('./demo/pages/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./demo/pages/authentication/sign-in/sign-in.component')
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      /*{
        path: '',
        redirectTo: '/loginPage',
        pathMatch: 'full'
      },*/

      // La routing de loginPage
      {
        path: 'loginPage',
        loadComponent: () => import('./demo/pages/authentication/login/login-page/login-page.component').then(m => m.LoginPageComponent)
      },

      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component')
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms/form-elements/form-elements.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/tables/tbl-bootstrap/tbl-bootstrap.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },

      // Ce que j'ai commencer a faire
      // La routing de produits
      {
        path: 'produit',
        loadComponent: () => import('./admin-page/produits/produits.component').then(m => m.ProduitsComponent)

      },

      // La routing de entrer
      {
        path: 'entrer',
        loadComponent: () => import('./admin-page/entrer/entrer.component').then(m => m.EntrerComponent)

      },

      // La routing de produits 
      {
        path: 'vente',
        loadComponent: () => import('./admin-page/vente/vente.component').then(m => m.VenteComponent)

      },

      // La routing de stocks
      {
        path: 'stocks',
        loadComponent: () => import('./admin-page/stocks/stocks.component').then(m => m.StocksComponent)

      },

      // La routing de Revenue
      {
        path: 'revenue',
        loadComponent: () => import('./admin-page/revenue/revenue.component').then(m => m.RevenueComponent)

      },

      // La routing de Facture
      {
        path: 'facture',
        loadComponent: () => import('./admin-page/facture/facture.component').then(m => m.FactureComponent)

      },

      // La routing de Compte
      {
        path: 'compte',
        loadComponent: () => import('./admin-page/compte/compte.component').then(m => m.CompteComponent)
      },

      // La routing de Compte
      {
        path: 'profil',
        loadComponent: () => import('./admin-page/profil/profil.component').then(m => m.ProfilComponent)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
