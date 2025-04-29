import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  template: `
<section class="relative overflow-hidden">
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-32">

    <!-- Texto del Hero -->
    <div class="max-w-xl text-left" data-aos="fade-right">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-white">
        Eleva tu sonido
        <span class="text-indigo-600">al máximo nivel</span>
      </h1>

      <p class="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Nuestro estudio ofrece la mejor tecnología y un equipo apasionado para que tu música destaque. Calidad profesional en cada proyecto.
      </p>

      <div class="mt-8">
        <a
          href="#contacto"
          class="inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          Reserva tu sesión
        </a>
      </div>
    </div>

    <!-- Imagen del Hero -->
    <div class="mt-10 lg:mt-0 lg:ml-10 flex-shrink-0" data-aos="fade-left">
      <img
        src="https://images.unsplash.com/photo-1574517947730-55cb23e608c2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Estudio de grabación"
        class="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>

  </div>
</section>
  `,
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent { }
