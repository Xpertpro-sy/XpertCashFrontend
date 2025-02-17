// angular import
import { Component, Input } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

interface ProgressBarItem {
  value: string;
  //color: string;
  //percentage: number;
}

@Component({
  selector: 'app-product-sale',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss']
})
export class ProductSaleComponent {
  @Input() productList: any[] = [];

  product_sale = [
    {
      title: 'Code'
    },
    {
    title: 'Désignation',
    },
    {
    title: 'Stock Mini',
    },
    {
    title: 'Stock initial',
    },
    {
    title: 'Entrée',
    },
    {
    title: 'Sortie',
    },
    {
    title: 'Alerte Stock',
    },
    {
    title: 'Stock Final',
    },
    {
      title: 'P.U.',
    },
    {
      title: 'Valeur du Stock (FCFA)',
    }
  ];


  staticProducts = [
    {
      designation: 'Produit 1',
      stockMini: 20,
      stockInitial: 100,
      entree: 0,
      sortie: 20,
      alert: '',
      stockFinal: 80,
      pu: 150,
      valeurStock: 12000,
    },
    {
      designation: 'Produit 2',
      stockMini: 30,
      stockInitial: 150,
      entree: 0,
      sortie: 30,
      stockFinal: 120,
      pu: 200,
      valeurStock: 24000,
    }
  ];

  get fullProductList() {
    return [...this.staticProducts, ...this.productList];
  }

  

   getStockBarWidth(product: any): string {
    // Si stockFinal <= stockMini, la barre est rouge et pleine (100%)
    if (product.stockFinal <= product.stockMini) {
      return '100%';
    }
    
    const ratio = (product.stockFinal / product.stockMini) * 100;
    return `${Math.min(ratio, 100)}%`;
  }

  getStockBarColor(product: any): string {
    // Si stockFinal < stockMini, la barre sera rouge
    if (product.stockFinal < product.stockMini) {
      return 'red';
    }
    // Si stockFinal >= stockMini, la barre sera verte
    return 'green';
  }
}
