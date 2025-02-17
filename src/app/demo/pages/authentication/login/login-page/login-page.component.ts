import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  entrepriseName: string = '';

  updateEntrepriseName(event: Event): void {
    this.entrepriseName = (event.target as HTMLInputElement).value.toLowerCase();
  }

  ngOnInit() {
    // Récupération des popups et overlays
    const popupOverlay = document.getElementById("popupOverlay");
    const popup = document.getElementById("popup");
    const popupOverlayLogin = document.getElementById("popupOverlayLogin");
    const popupLogin = document.getElementById("popupLogin");

    const openPopup = document.getElementById("openPopup");
    const closePopup = document.getElementById("closePopup");

    const openPopupLogin = document.getElementById("openPopupLogin");
    const closePopupLogin = document.getElementById("closePopupLogin");

    // Fonction pour fermer toutes les popups
    function closeAllPopups() {
      popup!.classList.remove("active");
      popupOverlay!.style.display = "none";

      popupLogin!.classList.remove("active");
      popupOverlayLogin!.style.display = "none";
    }

    // Ouvrir le popup d'inscription et fermer celui de connexion si actif
    openPopup?.addEventListener("click", () => {
      closeAllPopups(); // Ferme toutes les popups avant d'ouvrir
      popupOverlay!.style.display = "flex";
      setTimeout(() => {
        popup!.classList.add("active");
      }, 10);
    });

    // Fermer le popup d'inscription
    closePopup?.addEventListener("click", () => {
      popup!.classList.remove("active");
      setTimeout(() => {
        popupOverlay!.style.display = "none";
      }, 1);
    });

    popupOverlay?.addEventListener("click", (event) => {
      if (event.target === popupOverlay) {
        closeAllPopups();
      }
    });

    // Ouvrir le popup de connexion et fermer celui d'inscription si actif
    openPopupLogin?.addEventListener("click", () => {
      closeAllPopups(); // Ferme toutes les popups avant d'ouvrir
      popupOverlayLogin!.style.display = "flex";
      setTimeout(() => {
        popupLogin!.classList.add("active");
      }, 10);
    });

    // Fermer le popup de connexion
    closePopupLogin?.addEventListener("click", () => {
      popupLogin!.classList.remove("active");
      setTimeout(() => {
        popupOverlayLogin!.style.display = "none";
      }, 1);
    });

    popupOverlayLogin?.addEventListener("click", (event) => {
      if (event.target === popupOverlayLogin) {
        closeAllPopups();
      }
    });

    // Gestion du dropdown Identification
    const checkbox = document.getElementById("checkbox") as HTMLInputElement;
    const themePopup = document.querySelector(".theme-popup") as HTMLElement;

    checkbox?.addEventListener("change", (event) => {
      event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
      if (!themePopup.contains(event.target as Node)) {
        checkbox.checked = false;
      }
    });
  }
}
