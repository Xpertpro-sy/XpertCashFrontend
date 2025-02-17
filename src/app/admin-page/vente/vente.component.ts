import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';


import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-vente',
  imports: [CommonModule, FormsModule],
  templateUrl: './vente.component.html',
  styleUrl: './vente.component.scss'
})
export class VenteComponent {
  searchText: string = '';
  tasks = [
    { DateHeure: '04-02-2025 à 18:00', Category: 'Alimentation', Journalier: 'nmbrevente/j', NomDuProduit: 'L\'eau', Quantite: '300', QuantitePrix: 'Facture des ventes', PrixUnitaire: '200', PrixTotal: '60 000' },
    { DateHeure: '05-02-2025 à 14:00', Category: 'Alimentation', Journalier: 'nmbrevente/j', NomDuProduit: 'L\'eau', Quantite: '300', QuantitePrix: 'Facture des ventes', PrixUnitaire: '200', PrixTotal: '60 000' },
    { DateHeure: '06-02-2025 10:00', Category: 'Électronique', Journalier: 'Oui', NomDuProduit: 'Téléphone', Quantite: 2, QuantitePrix: 400, PrixUnitaire: 200, PrixTotal: 400 },
    { DateHeure: '06-02-2025 12:30', Category: 'Vêtements', Journalier: 'Non', NomDuProduit: 'T-shirt', Quantite: 5, QuantitePrix: 100, PrixUnitaire: 20, PrixTotal: 100 },
    { DateHeure: '07-02-2025 15:00', Category: 'Électronique', Journalier: 'Oui', NomDuProduit: 'Ordinateur', Quantite: 1, QuantitePrix: 1000, PrixUnitaire: 1000, PrixTotal: 1000 },
  ];

  // Fonction de filtrage
  filteredTasks() {
    return this.tasks.filter(task => 
      task.Category.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.NomDuProduit.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Fonction pour mettre en gras la correspondance dans une chaîne de texte
  highlightMatch(text: string): string {
    if (!this.searchText) return text; // Si aucune recherche, renvoie le texte d'origine
    
    // Création d'une expression régulière pour rechercher le texte en ignorant la casse
    const regex = new RegExp(`(${this.searchText})`, 'gi');
    
    // Remplacement de la correspondance par la même valeur mais avec <strong> pour mettre en gras
    return text.replace(regex, '<strong>$1</strong>');
  }
  // Pour l'exportation des fichier en format

  showExportDropdown = false;

  // Méthode pour basculer l'affichage du dropdown
  toggleExportDropdown() {
    this.showExportDropdown = !this.showExportDropdown;
  }

  // Méthode pour fermer le dropdown si on clique à l'extérieur
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) { 
    const target = event.target as HTMLElement;
    if (!target.closest('.export-container')) {
      this.showExportDropdown = false;
    }
  }

  downloadExcel() {
    console.log('Télécharger en format Excel');
    // Logique pour Excel
    const worksheet = XLSX.utils.json_to_sheet(this.tasks); // Remplacez `this.tasks` par vos données
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    XLSX.writeFile(workbook, 'Facture des ventes.xlsx');
  }

  

  // Télécharger en format PDF
  downloadPDF() {
    console.log("Téléchargement PDF en cours..."); 
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Liste des tâches', 14, 22);
    
    const columns = ['Date & heure', 'Categorie', 'Journalier', 'Nom du produit', 'Quantite', 'Quantite prix', 'Prix unitaire', 'Prix Total'];
    const rows = this.tasks.map(task => [
      task.DateHeure,
      task.Category,
      task.Journalier,
      task.NomDuProduit,
      task.Quantite,
      task.QuantitePrix,
      task.PrixUnitaire,
      task.PrixTotal
    ]);
  
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 30
    });
  
    doc.save('Facture des ventes.pdf');
  }
  

  // Télécharger en format CSV
  downloadCSV() {
    const headers = ['Date & heure', 'Categorie', 'Journalier', 'Nom du produit', 'Quantite', 'Quantite prix', 'Prix unitaire', 'Prix Total'];
    const rows = this.tasks.map(task => [
      task.DateHeure,
      task.Category,
      task.Journalier,
      task.NomDuProduit,
      task.Quantite,
      task.QuantitePrix,
      task.PrixUnitaire,
      task.PrixTotal,
    ]);

    // Convertir les données en format CSV
    const csvContent = [
      headers.join(','), // En-têtes
      ...rows.map(row => row.join(',')), // Données
    ].join('\n');

    // Créer un fichier CSV et le télécharger
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Facture des ventes.csv';
    link.click();
  }


}
