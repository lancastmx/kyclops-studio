// src/app/services/audio.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'; // takeUntil no es estrictamente necesario aquí si solo se usa destroy$ para ngOnDestroy

@Injectable({
  providedIn: 'root'
})
export class AudioService implements OnDestroy { // Asegúrate de implementar OnDestroy
  private audio = new Audio();
  private destroy$ = new Subject<void>(); // Para la limpieza en ngOnDestroy

  // --- Estado Reactivo del Reproductor ---
  private audioSrcState = new BehaviorSubject<string>('');
  private isPlayingState = new BehaviorSubject<boolean>(false);
  private currentTimeState = new BehaviorSubject<number>(0);
  private durationState = new BehaviorSubject<number>(0);
  private progressState = new BehaviorSubject<number>(0); // Progreso en porcentaje (0-100)
  private isMetadataLoadedState = new BehaviorSubject<boolean>(false);
  private errorState = new BehaviorSubject<string | null>(null);

  // --- Observables Públicos ---
  public audioSrc$ = this.audioSrcState.asObservable();
  public isPlaying$ = this.isPlayingState.asObservable();
  public currentTime$ = this.currentTimeState.asObservable();
  public duration$ = this.durationState.asObservable();
  public progress$ = this.progressState.asObservable();
  public isMetadataLoaded$ = this.isMetadataLoadedState.asObservable();
  public error$ = this.errorState.asObservable();

  constructor() {
    this.setupEventListeners();
    // Carga el archivo de audio por defecto.
    // ¡Asegúrate que este archivo exista en la ruta correcta!
    this.setSource('assets/kyclopsPodcast.wav');
  }

  private setupEventListeners(): void {
    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('play', this.handlePlay);
    this.audio.addEventListener('pause', this.handlePause);
    this.audio.addEventListener('ended', this.handleEnded);
    this.audio.addEventListener('error', this.handleError);
    // Considera 'canplay' o 'canplaythrough' si necesitas saber cuándo está listo para empezar sin interrupciones
    // this.audio.addEventListener('canplay', this.handleCanPlay);
  }

  private removeEventListeners(): void {
    this.audio.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.removeEventListener('play', this.handlePlay);
    this.audio.removeEventListener('pause', this.handlePause);
    this.audio.removeEventListener('ended', this.handleEnded);
    this.audio.removeEventListener('error', this.handleError);
    // this.audio.removeEventListener('canplay', this.handleCanPlay);
  }

  // --- Manejadores de Eventos (usando arrow functions para mantener el contexto de 'this') ---
  private handleLoadedMetadata = () => {
    this.durationState.next(this.audio.duration);
    this.isMetadataLoadedState.next(true);
    this.errorState.next(null);
    console.log('Audio metadata loaded. Duration:', this.audio.duration);
  };

  private handleTimeUpdate = () => {
    const currentTime = this.audio.currentTime;
    const duration = this.audio.duration;
    this.currentTimeState.next(currentTime);
    if (duration > 0 && isFinite(duration)) { // Asegurarse que duration es válida
      this.progressState.next((currentTime / duration) * 100);
    } else {
      this.progressState.next(0);
    }
  };

  private handlePlay = () => {
    this.isPlayingState.next(true);
    this.errorState.next(null); // Limpiar errores al empezar a reproducir
  };

  private handlePause = () => {
    this.isPlayingState.next(false);
  };

  private handleEnded = () => {
    this.isPlayingState.next(false);
    this.audio.currentTime = 0; // Reiniciar al finalizar
    this.progressState.next(0);   // Reiniciar progreso
    this.currentTimeState.next(0); // Reiniciar tiempo actual
  };

  private handleError = (event: Event) => {
    const mediaError = (event.target as HTMLAudioElement).error;
    let errorMessage = 'Se produjo un error desconocido al cargar el audio.';
    if (mediaError) {
      switch (mediaError.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage = 'La carga del audio fue abortada por el usuario o el sistema.';
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage = 'Error de red. Verifica tu conexión o la URL del audio.';
          break;
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage = 'Error de decodificación. El archivo de audio podría estar corrupto o en un formato no compatible.';
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = 'Fuente de audio no compatible. El formato del archivo no es soportado o la URL no es accesible.';
          break;
        default:
          errorMessage = `Se produjo un error desconocido (código: ${mediaError.code}).`;
      }
    }
    console.error('Audio Error Event:', event, 'Error Message:', errorMessage, 'MediaError Object:', mediaError);
    this.errorState.next(errorMessage);
    // Reiniciar estados relacionados con la reproducción
    this.isPlayingState.next(false);
    this.isMetadataLoadedState.next(false);
    this.durationState.next(0);
    this.currentTimeState.next(0);
    this.progressState.next(0);
  };

  // Opcional: Manejador para 'canplay'
  // private handleCanPlay = () => {
  //   console.log('Audio can play.');
  //   this.isMetadataLoadedState.next(true); // O un estado 'isReadyToPlayState'
  // };


  // --- Métodos Públicos de Control ---
  public setSource(src: string): void {
    // Detener y resetear antes de cambiar la fuente
    this.pause();
    this.audio.currentTime = 0;
    this.progressState.next(0);
    this.currentTimeState.next(0);
    this.durationState.next(0);
    this.isMetadataLoadedState.next(false);
    this.errorState.next(null);

    this.audioSrcState.next(src);
    this.audio.src = src;
    this.audio.load(); // Importante: Carga la nueva fuente explícitamente
    console.log('Attempting to load audio source:', src);
  }

  public play(): void {
    // Solo intentar reproducir si la metadata está cargada (o al menos si hay una fuente) y está pausado
    if (this.audio.src && this.audio.paused && (this.isMetadataLoadedState.value || this.audio.readyState >= 2) ) { // HAVE_CURRENT_DATA or more
      this.audio.play().catch(error => {
        console.error('Error al intentar reproducir (play method):', error);
        this.errorState.next(`Error al reproducir: ${error.message || 'Error desconocido'}`);
        this.isPlayingState.next(false); // Asegurarse que el estado refleje que no está sonando
      });
    } else if (!this.audio.src) {
        const msg = 'No hay fuente de audio establecida para reproducir.';
        console.warn(msg);
        this.errorState.next(msg);
    } else if (!this.isMetadataLoadedState.value && this.audio.readyState < 2) {
        const msg = 'El audio aún no está listo para reproducirse (metadata no cargada o datos insuficientes). Intenta de nuevo en un momento.';
        console.warn(msg);
        // No necesariamente un error, pero el usuario podría querer saber.
        // this.errorState.next(msg); // Opcional: informar al usuario
    }
  }

  public pause(): void {
    if (!this.audio.paused) {
      this.audio.pause();
    }
  }

  public togglePlayPause(): void {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  public seekTo(percentage: number): void {
    // Solo permitir buscar si la metadata está cargada y la duración es válida
    if (this.isMetadataLoadedState.value && this.audio.duration > 0 && isFinite(this.audio.duration)) {
      const seekTime = (percentage / 100) * this.audio.duration;
      this.audio.currentTime = Math.max(0, Math.min(seekTime, this.audio.duration)); // Asegurar que esté dentro de los límites
    }
  }

  public setVolume(volume: number): void { // volume de 0 a 1
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.removeEventListeners();
    this.audio.pause();
    this.audio.src = ''; // Liberar la fuente para detener cualquier descarga y liberar recursos
    // No necesitas hacer 'this.audio = null' ya que el servicio se destruirá de todas formas
    console.log('AudioService destroyed and cleaned up.');
  }
}