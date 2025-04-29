import { Component } from '@angular/core';
import { HeroComponent } from "../components/hero/hero.component";
import { CardsServiciosComponent } from "../components/cards-servicios/cards-servicios.component";
import { PreciosComponent } from "../components/precios/precios.component";
import { FooterComponent } from "../components/footer/footer.component";
import { AboutComponent } from "../components/about/about.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, CardsServiciosComponent, PreciosComponent, FooterComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
