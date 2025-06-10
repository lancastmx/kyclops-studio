// src/app/landingpage/landingpage.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewChildren, ElementRef, Inject, PLATFORM_ID, QueryList } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AudioService, AudioTrack } from '../services/audio.service';
import { Title, Meta } from '@angular/platform-browser';
import { socialLinks, SocialLink } from '../core/constants/social-links'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit, AfterViewInit, OnDestroy {
  isSidebarOpen: boolean = false; 
  currentYear: number;
  audioSrc: string = '';
  whatsAppPhoneNumber: string = '5523464163';
  @ViewChildren('animatedElement') animatedElementsRef!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;
  private audio!: HTMLAudioElement;
  socialMediaLinks: SocialLink[] = socialLinks;
  isPlaying = false;
  progress = 0;
  currentTimeFormatted = '0:00';
  durationFormatted = '0:00';
  isMetadataLoaded = false;
  audioError: string | null = null;

  private isBrowser: boolean;
  tracks: AudioTrack[] = [];
  activeTrack: AudioTrack | null = null
  constructor(
    private audioService: AudioService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.currentYear = new Date().getFullYear();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.setMetaTagsForThisPage();
     this.tracks = this.audioService.getAudioTracks();
    if (this.tracks.length > 0) {
      this.selectTrack(this.tracks[0]);
    }
  }
   toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
  // En landingpage.component.ts
openWhatsAppChat(message: string): void { // Renombramos la función para ser más clara
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.whatsAppPhoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank'); // Abrir siempre en una nueva pestaña
  }
  setMetaTagsForThisPage(): void {
    const pageTitle = 'Kyclops Studio - Podcasting Estratégico para Marcas';
    const pageDescription = 'En Kyclops Studio, transformamos tu mensaje en podcasts que conectan, fidelizan y convierten. Descubre el poder del marketing auditivo estratégico.';
    const imageUrl = 'https://www.kyclopsradio.com/assets/images/kyclops-social-preview.jpg'; // ¡IMPORTANTE: Reemplaza con tu URL real!
    const pageUrl = 'https://www.kyclopsradio.com/'; // ¡IMPORTANTE: Reemplaza con tu URL real!

    // Establecer el título de la página
    this.titleService.setTitle(pageTitle);

    // Establecer los meta tags principales
    this.metaService.updateTag({ name: 'description', content: pageDescription });
    this.metaService.updateTag({ name: 'author', content: 'Kyclops Studio' });

    // Establecer los meta tags de Open Graph (para Facebook, WhatsApp, etc.)
    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: pageDescription });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ property: 'og:url', content: pageUrl });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // Establecer los meta tags de Twitter Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: pageTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: pageDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
  }
  selectTrack(track: AudioTrack): void {
    this.activeTrack = track;
    this.audioSrc = track.src;
    if (this.audio) {
      this.audio.load();
    }
  }
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.audio = this.audioPlayerRef.nativeElement;
      this.addAudioEventListeners();
      // Mover initScrollAnimations aquí asegura que se ejecute solo en el navegador
      this.initScrollAnimations();
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

  // ✅ MÉTODO CORREGIDO
  formatTime(seconds: number): string {
    // Primero, manejamos casos donde la entrada no es un número válido.
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) {
      return '0:00'; // Siempre devolvemos un string
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // ✅ MÉTODO CORREGIDO (asegurándonos de que está la lógica completa)
  initScrollAnimations(): void {
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


  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.removeAudioEventListeners();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
}