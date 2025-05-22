import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { environment } from '../environments/environment';
// @ts-ignore
import { Autocompleter } from "../../node_modules/autocompleter-caba/dist/index.js";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div>
      <input [(ngModel)]="input" placeholder="Ingrese dirección o lugar" />
      <button (click)="getSuggestions()">Obtener Sugerencias</button>
      <button (click)="searchAddress()">Buscar Dirección</button>
      <button (click)="searchPlace()">Buscar Lugar</button>
      <p>Revisa la consola del navegador para ver los resultados.</p>
    </div>
  `,
})
export class AppComponent implements OnInit {
  input = "Callao 520";
  autocompleter: Autocompleter;

  constructor() {
    this.autocompleter = new Autocompleter();
  }

  ngOnInit() {
    this.autocompleter.setApiBaseUrl(environment.DEV);
    // this.autocompleter.setCredentials(environment.CLIENT_ID_PROD, environment.CLIENT_SECRET_PROD);
    this.autocompleter.setGeocodingMethods(["geocodificacion_directa"]);
    console.log(
      "Métodos geocodificación permitidos:",
      this.autocompleter.getGeocodingMethods()
    );
  }

  async getSuggestions() {
    console.log(`Buscando sugerencias para: ${this.input}`);
    const suggestions = await this.autocompleter.getSuggestions(this.input);
    console.log("Sugerencias:", suggestions);
  }

  async searchAddress() {
    console.log(`Buscando dirección: ${this.input}`);
    const result = await this.autocompleter.getSearchAddress(this.input);
    console.log("Resultado Búsqueda Dirección:", result);
  }

  async searchPlace() {
    console.log(`Buscando lugar: ${this.input}`);
    const result = await this.autocompleter.getSearchPlaces(this.input);
    console.log("Resultado Búsqueda Lugar:", result);
  }
}
