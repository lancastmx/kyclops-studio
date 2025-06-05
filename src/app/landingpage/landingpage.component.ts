
import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, QueryList, ViewChildren, HostListener } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent implements OnInit, AfterViewInit, OnDestroy{
    currentYear: number;

  @ViewChildren('animatedElement') animatedElementsRef!: QueryList<ElementRef>; // Added !
  private observer: IntersectionObserver | null = null;

  @ViewChild('audioElement') audioElementRef!: ElementRef<HTMLAudioElement>;        // Added !
  @ViewChild('playIcon') playIconRef!: ElementRef<HTMLElement>;                  // Added !
  @ViewChild('seekBarFill') seekBarFillRef!: ElementRef<HTMLElement>;              // Added !
  @ViewChild('seekBarContainer') seekBarContainerRef!: ElementRef<HTMLElement>;    // Added !
  @ViewChild('audioTimeDisplay') audioTimeDisplayRef!: ElementRef<HTMLElement>;    // Added !

  audioPlaying = false;
  audioProgress = 0;
  audioCurrentTimeFormatted = '0:00';
  audioDurationFormatted = '0:00';
  private audio!: HTMLAudioElement; // Added !

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initScrollAnimations();
    
    // Now that audioElementRef is asserted with !, we assume it will be available.
    // However, good practice might still involve a check if the element might conditionally not exist in the template.
    if (this.audioElementRef && this.audioElementRef.nativeElement) {
      this.audio = this.audioElementRef.nativeElement;
      this.setupAudioPlayer();
    } else {
      console.error('Audio element not found after view init. Check template reference variable #audioElement.');
    }
  }

  initScrollAnimations(): void {
    // Ensure animatedElementsRef is populated
    if (!this.animatedElementsRef || this.animatedElementsRef.length === 0) {
        // console.warn('No elements found for scroll animation with #animatedElement.');
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

  setupAudioPlayer(): void {
    // 'this.audio' is now definitely assigned if audioElementRef was found
    this.audio.addEventListener('loadedmetadata', this.updateAudioTimeAndDuration);
    this.audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.audio.addEventListener('ended', this.onAudioEnded);
    
    if (this.audio.readyState >= 1) {
        this.updateAudioTimeAndDuration();
    }
  }

  // Bound arrow functions to maintain 'this' context in event listeners
  private updateAudioTimeAndDuration = (): void => {
    if (this.audio && !isNaN(this.audio.duration) && isFinite(this.audio.duration)) {
      this.audioDurationFormatted = this.formatTime(this.audio.duration);
      this.audioCurrentTimeFormatted = this.formatTime(this.audio.currentTime);
    } else {
      this.audioDurationFormatted = '--:--';
      this.audioCurrentTimeFormatted = '0:00';
    }
  }

  private onTimeUpdate = (): void => {
    if (this.audio && this.audio.duration) {
      this.audioProgress = (this.audio.currentTime / this.audio.duration) * 100;
      this.audioCurrentTimeFormatted = this.formatTime(this.audio.currentTime);
    }
  }

  private onAudioEnded = (): void => {
    this.audioPlaying = false;
    this.audioProgress = 0;
    if (this.audio) {
        this.audio.currentTime = 0;
    }
    this.audioCurrentTimeFormatted = this.formatTime(0);
  }

  togglePlay(): void {
    if (!this.audio) return;

    if (this.audio.paused) {
      this.audio.play().then(() => {
        this.audioPlaying = true;
      }).catch(error => console.error("Error playing audio:", error));
    } else {
      this.audio.pause();
      this.audioPlaying = false;
    }
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds) || !isFinite(seconds)) {
        return '--:--';
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  seekAudio(event: MouseEvent): void {
    if (!this.audio || !this.seekBarContainerRef || isNaN(this.audio.duration) || !isFinite(this.audio.duration)) return;

    const seekBar = this.seekBarContainerRef.nativeElement;
    const bounds = seekBar.getBoundingClientRect();
    const clickPositionInPixels = event.clientX - bounds.left;
    const clickPositionInPercentage = clickPositionInPixels / bounds.width;
    this.audio.currentTime = clickPositionInPercentage * this.audio.duration;
  }

  onFormSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    console.log('Form submitted:', { name, email, message });
    alert('Mensaje enviado (simulación). Revisa la consola para ver los datos.');
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.audio) {
      this.audio.removeEventListener('loadedmetadata', this.updateAudioTimeAndDuration);
      this.audio.removeEventListener('timeupdate', this.onTimeUpdate);
      this.audio.removeEventListener('ended', this.onAudioEnded);
      // It's also good practice to pause and nullify the src if you're cleaning up thoroughly
      this.audio.pause();
      this.audio.src = '';
      // this.audio = null; // Not strictly necessary if component is destroyed, but can help GC.
    }
  }
} 
