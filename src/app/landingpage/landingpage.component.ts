// src/app/landingpage/landingpage.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf, async pipe, etc.
import { AudioService } from '../services/audio.service'; // Asegúrate que la ruta es correcta
import { Observable, Subscription } from 'rxjs';     // Importa Observable y Subscription

@Component({
  selector: 'app-landingpage', // Tu selector
  standalone: true,
  imports: [
    CommonModule,
    // No necesitamos FormatTimePipe aquí por ahora, usaremos el método del componente
  ],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit, AfterViewInit, OnDestroy {
  currentYear: number;

  // Las referencias @ViewChild para los elementos del reproductor de audio se eliminan,
  // ya que el servicio maneja el objeto Audio internamente y no tendremos una etiqueta <audio> aquí.
  // La única @ViewChildren que se mantiene es para la animación de scroll.
  @ViewChildren('animatedElement') animatedElementsRef!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  // --- Propiedades para el estado del audio, obtenidas del servicio ---
  isPlaying$: Observable<boolean>;
  progress$: Observable<number>; // El progreso ya viene como porcentaje (0-100) desde el servicio
  isMetadataLoaded$: Observable<boolean>;
  audioError$: Observable<string | null>;

  // Propiedades locales para mostrar el tiempo formateado
  audioCurrentTimeFormatted: string = '0:00';
  audioDurationFormatted: string = '0:00';

  private subscriptions = new Subscription(); // Para manejar las suscripciones y desuscribirse

  // Se inyecta el AudioService
  constructor(public audioService: AudioService) { // 'public' para poder usarlo directamente en el template si quisieras
    this.currentYear = new Date().getFullYear();

    // Asignamos los observables del servicio a las propiedades del componente.
    // El template usará el pipe 'async' para suscribirse a estos.
    this.isPlaying$ = this.audioService.isPlaying$;
    this.progress$ = this.audioService.progress$;
    this.isMetadataLoaded$ = this.audioService.isMetadataLoaded$;
    this.audioError$ = this.audioService.error$;
  }

  ngOnInit(): void {
    // Nos suscribimos manualmente a currentTime$ y duration$ para poder formatearlos
    // usando el método formatTime() de este componente.
    this.subscriptions.add(
      this.audioService.currentTime$.subscribe(currentTime => {
        this.audioCurrentTimeFormatted = this.formatTime(currentTime);
      })
    );

    this.subscriptions.add(
      this.audioService.duration$.subscribe(duration => {
        this.audioDurationFormatted = this.formatTime(duration);
      })
    );
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
    // Ya no necesitamos llamar a setupAudioPlayer() ni interactuar con audioElementRef aquí.
    // El AudioService se encarga de cargar el audio en su constructor.
  }

  initScrollAnimations(): void {
    // Esta lógica permanece igual
    if (!this.animatedElementsRef || this.animatedElementsRef.length === 0) {
      return;
    }
    const options = { threshold: 0.1 };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animationPlayState = 'running';
          if (this.observer) {
            this.observer.unobserve(entry.target);
          }
        }
      });
    }, options);
    this.animatedElementsRef.forEach(elRef => {
      (elRef.nativeElement as HTMLElement).style.animationPlayState = 'paused';
      if (this.observer) {
        this.observer.observe(elRef.nativeElement);
      }
    });
  }

  // El método formatTime lo mantenemos en el componente por ahora.
  // Más adelante, si quieres, se puede mover a un Pipe para limpiar el componente.
  formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // --- Los métodos de control de audio ahora llaman al servicio ---
  togglePlay(): void {
    this.audioService.togglePlayPause();
  }

  // Este método ahora usa el evento directamente para calcular la posición,
  // ya que no tenemos @ViewChild para seekBarContainerRef.
  seekAudio(event: MouseEvent | TouchEvent): void {
    const seekBarElement = event.currentTarget as HTMLElement; // El elemento que disparó el evento (el div de la barra)
    const bounds = seekBarElement.getBoundingClientRect();
    let clientX: number;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
    } else {
      return; // Tipo de evento no esperado o sin datos táctiles
    }

    const clickPositionInPixels = clientX - bounds.left;
    const width = bounds.width;
    if (width === 0) return; // Evitar división por cero

    const clickPositionInPercentage = (clickPositionInPixels / width) * 100;
    // Asegurar que el porcentaje esté entre 0 y 100
    this.audioService.seekTo(Math.max(0, Math.min(100, clickPositionInPercentage)));
  }

  // Tu lógica de formulario permanece igual
  onFormSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log('Form submitted:', {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    });
    alert('Mensaje enviado (simulación). Revisa la consola para ver los datos.');
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.subscriptions.unsubscribe(); // ¡Importante! Desuscribirse para evitar fugas de memoria.
    // No es necesario llamar a ngOnDestroy del servicio aquí, Angular maneja los servicios 'root'.
  }
}