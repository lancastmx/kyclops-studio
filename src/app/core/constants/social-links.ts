// src/app/core/constants/social-links.ts

/**
 * @interface SocialLink
 * @description Define la estructura para un enlace de red social.
 * @property {string} name - Nombre de la red social (ej: 'Facebook').
 * @property {string} url - URL completa del perfil de la red social.
 * @property {string} iconClass - Clase de Boxicons para el icono de la red social (ej: 'bxl-facebook-circle').
 */
export interface SocialLink {
  name: string;
  url: string;
  iconClass: string;
}

/**
 * @constant socialLinks
 * @description Array de objetos que contienen las direcciones y los íconos de las redes sociales de Kyclops Radio.
 */
export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/kyclopsradio',
    iconClass: 'bxl-linkedin-square' // Icono de Boxicons para LinkedIn
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/KyclopsRadio',
    iconClass: 'bxl-facebook-circle' // Icono de Boxicons para Facebook
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/KyclopsRadio',
    iconClass: 'bxl-twitter' // Icono de Boxicons para Twitter/X
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/kyclopsradio/',
    iconClass: 'bxl-instagram-alt' // Icono de Boxicons para Instagram
  },
  {
    name: 'Pocket Casts',
    url: 'https://pca.st/e61hmrgi',
    iconClass: 'bx-podcast' // Icono de Boxicons para Podcast (o uno similar si prefieres)
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@kyclopsradio/featured', // Asegúrate de que esta URL sea válida para YouTube
    iconClass: 'bxl-youtube' // Icono de Boxicons para YouTube
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/show/2GWOpx2v6zGyHLcESPXtL5?si=5d73e17976c04bb4', // Asegúrate de que esta URL sea válida para Spotify
    iconClass: 'bxl-spotify' // Icono de Boxicons para Spotify
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@kyclopsradio',
    iconClass: 'bxl-tiktok' // Icono de Boxicons para TikTok
  }
];