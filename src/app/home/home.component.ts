import { Component } from '@angular/core';
import { HeroComponent } from "../components/hero/hero.component";
import { CardsServiciosComponent } from "../components/cards-servicios/cards-servicios.component";
import { PreciosComponent } from "../components/precios/precios.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, CardsServiciosComponent, PreciosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
