import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/admin-page/MODELS/utilisateur.model';
import { UsersService } from 'src/app/admin-page/SERVICES/users.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  registerForm!: FormGroup;
  entrepriseName: string = '';
  errorMessage: string = '';

  // Propriétés pour la popup
  showPopup: boolean = false;
  popupTitle: string = '';
  popupMessage: string = '';
  popupImage: string = '';
  popupType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nomComplet: ['', Validators.required],
      nomEntreprise: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pays: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(8)]], 
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Validation personnalisée pour vérifier que "password" et "confirmPassword" correspondent
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  // Mise à jour dynamique du nom d'entreprise
  updateEntrepriseName(event: Event): void {
    this.entrepriseName = (event.target as HTMLInputElement).value.toLowerCase();
    this.registerForm.get('nomEntreprise')?.setValue(this.entrepriseName);
  }

  // Ouvre la popup avec titre, message et type (success ou error)
  openPopup(title: string, message: string, type: 'success' | 'error'): void {
    this.popupTitle = title;
    this.popupMessage = message;
    this.popupType = type;
    // Choix de l'image en fonction du type
    if (type === 'success') {
      this.popupImage = 'assets/img/succcccc.png'; // Remplacez par le chemin de votre image de succès
    } else {
      this.popupImage = 'assets/img/error.png'; // Remplacez par le chemin de votre image d'erreur
    }
    this.showPopup = true;
  }

  // Ferme la popup et redirige si l'inscription a réussi
  closePopup(): void {
    this.showPopup = false;
    if (this.popupType === 'success') {
      this.router.navigate(['/accueilll']);
    }
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = "Veuillez vérifier les informations saisies.";
      return;
    }
  
    // Exclure 'confirmPassword' des données envoyées
    const { confirmPassword, ...userData } = this.registerForm.value;
    const user: Users = userData;
  
    this.usersService.registerUser(user).subscribe({
      next: (response) => {
        if (response && response.message) {
          this.openPopup("Inscription réussie !", response.message, 'success');
        } else {
          this.errorMessage = response.error || "Erreur d'inscription, veuillez vérifier les champs.";
          this.openPopup("Erreur d'inscription", this.errorMessage, 'error');
        }
      },
      error: (error) => {
        console.log("Erreur complète :", error);
        console.log("Réponse API :", error.error); // Ajout du log pour voir l'erreur exacte
      
        let message = "Une erreur est survenue lors de l'inscription.";
      
        if (error.status === 400 || error.status === 500) {
          if (typeof error.error === "string") {
            // Extraction avancée du message dans une erreur sous forme de texte brut
            const match = error.error.match(/interpolatedMessage='([^']+)'/);
            message = match ? match[1] : error.error;
          } else if (error.error?.error) {
            message = error.error.error;
          }
        }
      
        this.openPopup("❌ Oups, une erreur !", message, "error");
      }      
      
    });
  }

  // Getter pour faciliter l'accès aux contrôles dans le template
  get f() { return this.registerForm.controls; }
}
