import { Component, HostListener } from '@angular/core';
import { ProductSaleComponent } from './product-sale/product-sale.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-produits',
  imports: [SharedModule, NgApexchartsModule, ProductSaleComponent],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss'
})
export class ProduitsComponent {
  showForm = false; // Gère l'affichage du formulaire
  productList: any[] = []; 
  toastMessage: string = '';
  toastType: string = ''; 

  newProduct = {
    id: '',
    designation: '',
    stockMini: 0,
    stockInitial: 0,
    entree: 0,
    sortie: 0,
    alert: '',
    stockFinal: 0,
    pu: 0,
    valeurStock: 0
  };

  toggleForm() {
    if (this.showForm) {
      // Réinitialiser uniquement lors de la fermeture du formulaire
      this.newProduct = {
        id: '',
        designation: '',
        stockMini: 0,
        stockInitial: 0,
        entree: 0,
        sortie: 0,
        alert: '',
        stockFinal: 0,
        pu: 0,
        valeurStock: 0
      };
    }
    this.showForm = !this.showForm;
  }

  

  showToast(message: string, type: string) {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => {
      this.toastMessage = '';   
    }, 3000);
  }
   

  addProduct() {
    if (!this.newProduct.designation || this.newProduct.stockInitial <= 0 || this.newProduct.pu <= 0) {
      this.showToast("Veuillez remplir tous les champs obligatoires", "error");
      return;
    }

    this.newProduct.stockFinal = this.newProduct.stockInitial;
    this.newProduct.valeurStock = this.newProduct.stockFinal * this.newProduct.pu;

    this.productList.push({ ...this.newProduct });

    this.showToast("Produit ajouté avec succès !", "success");

    this.newProduct = {
      id: '',
      designation: '',
      stockMini: 0,
      stockInitial: 0,
      entree: 0,
      sortie: 0,
      alert: '',
      stockFinal: 0,
      pu: 0,
      valeurStock: 0
    };

    this.toggleForm();
  }
}
