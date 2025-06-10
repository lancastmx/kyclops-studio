// src/app/services/audio.service.ts
import { Injectable } from '@angular/core';

// ✅ PASO 1: DEFINICIÓN DE LA INTERFAZ
// Le decimos a TypeScript cómo debe ser un objeto de pista de audio.
export interface AudioTrack {
  title: string;
  src: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  // ✅ PASO 2: USAR LA INTERFAZ PARA TIPAR EL ARRAY
  // Ahora, 'tracks' solo puede contener objetos que cumplan con la estructura de AudioTrack.
  private tracks: AudioTrack[] = [
    {
      title: 'Podcast Kyclops',
      src: 'assets/kyclopsPodcast.wav'
    },
    {
      title: 'Pixel Paradise',
      src: 'assets/pixelParadise.mp3'
    },
    { 
      title: 'Humaniza tu Marca',
      src: 'assets/audio/humanizaMarca.wav'
    }
  ];

  constructor() { }

  // ✅ PASO 3: USAR LA INTERFAZ EN EL TIPO DE RETORNO DE LA FUNCIÓN
  // Esto deja claro que la función siempre devolverá un array de objetos AudioTrack.
  getAudioTracks(): AudioTrack[] {
    return this.tracks;
  }
}