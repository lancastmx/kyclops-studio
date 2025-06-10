import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AudioTrack } from '../../../services/audio.service'; // Ajusta la ruta si 'data' no está en 'app/'

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements AfterViewInit, OnDestroy {
  // Este componente recibe la información de la pista desde su padre a través de un Input.
  @Input() track!: AudioTrack;

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  private audio!: HTMLAudioElement;

  // El estado es local y autocontenido en este componente
  isPlaying = false;
  progress = 0;
  currentTimeFormatted = '0:00';
  durationFormatted = '0:00';
  isMetadataLoaded = false;
  audioError: string | null = null;
  
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.audio = this.audioPlayerRef.nativeElement;
      this.addAudioEventListeners();
    }
  }

  addAudioEventListeners(): void {
    this.audio.addEventListener('loadedmetadata', this.updateAudioDetails);
    this.audio.addEventListener('timeupdate', this.updateTime);
    this.audio.addEventListener('ended', this.onAudioEnded);
    this.audio.addEventListener('error', this.handleAudioError);
    this.audio.addEventListener('playing', () => this.isPlaying = true);
    this.audio.addEventListener('pause', () => this.isPlaying = false);
  }

  removeAudioEventListeners(): void {
    if (this.audio) {
      this.audio.removeEventListener('loadedmetadata', this.updateAudioDetails);
      this.audio.removeEventListener('timeupdate', this.updateTime);
      this.audio.removeEventListener('ended', this.onAudioEnded);
      this.audio.removeEventListener('error', this.handleAudioError);
      this.audio.removeEventListener('playing', () => this.isPlaying = true);
      this.audio.removeEventListener('pause', () => this.isPlaying = false);
    }
  }

  updateAudioDetails = (): void => {
    this.durationFormatted = this.formatTime(this.audio.duration);
    this.isMetadataLoaded = true;
  };

  updateTime = (): void => {
    this.currentTimeFormatted = this.formatTime(this.audio.currentTime);
    this.progress = (this.audio.currentTime / this.audio.duration) * 100;
  };

  onAudioEnded = (): void => {
    this.isPlaying = false;
    this.audio.currentTime = 0;
  };

  handleAudioError = (): void => {
    this.audioError = "No se pudo cargar el archivo de audio. Verifica la ruta o el formato.";
  };

  togglePlay(): void {
    if (!this.isBrowser || !this.isMetadataLoaded) return;
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  seekAudio(event: MouseEvent): void {
    if (!this.isBrowser || !this.isMetadataLoaded) return;
    const seekBarElement = event.currentTarget as HTMLElement;
    const bounds = seekBarElement.getBoundingClientRect();
    const clickPositionInPercentage = (event.clientX - bounds.left) / bounds.width;
    this.audio.currentTime = clickPositionInPercentage * this.audio.duration;
  }
  
  formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.removeAudioEventListeners();
      // Detener el audio si el componente se destruye para evitar que siga sonando
      if(this.audio) {
        this.audio.pause();
        this.audio.src = '';
      }
    }
  }
}