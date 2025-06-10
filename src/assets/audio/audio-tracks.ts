// Definimos una interfaz para asegurar que todos nuestros objetos de audio tengan la misma estructura.
export interface AudioTrack {
  id: number;
  title: string;
  src: string;
}

// Exportamos un array constante con nuestras pistas de audio.
// Puedes añadir tantos audios como quieras aquí.
export const AllAudioTracks: AudioTrack[] = [
  {
    id: 1,
    title: 'Podcast Demo (WAV)',
    src: 'assets/audio/podcast_demo.wav' // Asegúrate que el archivo esté en src/assets/audio/
  },
  {
    id: 2,
    title: 'Pixel Paradise (MP3)',
    src: 'assets/audio/pixelParadise.mp3' // Asegúrate que el archivo esté en src/assets/audio/
  },
  // Puedes añadir más aquí...
  // {
  //   id: 3,
  //   title: 'Otra Muestra de Podcast',
  //   src: 'assets/audio/otro_podcast.mp3'
  // }
];