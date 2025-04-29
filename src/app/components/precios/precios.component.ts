import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-precios',
  imports: [],
  template: `
<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

    <!-- Plan Starter -->
    <div class="rounded-2xl border border-gray-200 p-8 shadow-md transform hover:scale-105 transition duration-300">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-100">Plan Básico</h2>
        <p class="mt-2 text-gray-200">Ideal para artistas emergentes</p>
        <p class="mt-4">
          <strong class="text-4xl font-bold text-indigo-600"> $50 </strong>
          <span class="text-sm text-gray-500">/ sesión</span>
        </p>
      </div>

      <ul class="mt-8 space-y-3">
        <li class="flex items-center">
          <span class="text-gray-200 mr-2">✔️</span> 1 hora de grabación
        </li>
        <li class="flex items-center">
          <span class="text-gray-200 mr-2">✔️</span> Edición básica
        </li>
        <li class="flex items-center">
          <span class="text-gray-200 mr-2">✔️</span> Asesoría vocal
        </li>
      </ul>

      <a
        href="#"
        class="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-6 py-3 text-center text-white font-medium hover:bg-indigo-700 transition"
      >
        Empezar
      </a>
    </div>

    <!-- Plan Pro -->
    <div class="rounded-2xl border-2 border-indigo-600 p-8 shadow-lg transform hover:scale-105 transition duration-300 animate-pulse">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-indigo-700">Plan Profesional</h2>
        <p class="mt-2 text-gray-600">Para proyectos de alto nivel</p>
        <p class="mt-4">
          <strong class="text-4xl font-bold text-indigo-700"> $120 </strong>
          <span class="text-sm text-gray-500">/ sesión</span>
        </p>
      </div>

      <ul class="mt-8 space-y-3">
        <li class="flex items-center">
          <span class="text-gray-200 mr-2">✔️</span> 3 horas de grabación
        </li>
        <li class="flex items-center">
          <span class="text-gray-200 mr-2">✔️</span> Edición y mezcla profesional
        </li>
        <li class="flex items-center">
          <span class="text-gray-200 mr-2">✔️</span> Masterización digital
        </li>
        <li class="flex items-center">
          <span class="text-gray-200 mr-2">✔️</span> Asesoría de producción
        </li>
      </ul>

      <a
        href="#"
        class="mt-8 block rounded-full border border-indigo-700 bg-white px-6 py-3 text-center text-indigo-700 font-medium hover:bg-indigo-700 hover:text-white transition"
      >
        Contratar
      </a>
    </div>

    <!-- Plan Elite -->
    <div class="rounded-2xl border border-gray-200 p-8 shadow-md transform hover:scale-105 transition duration-300">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-100">Plan Elite</h2>
        <p class="mt-2 text-gray-300">Para artistas y bandas consolidadas</p>
        <p class="mt-4">
          <strong class="text-4xl font-bold text-indigo-600"> $250 </strong>
          <span class="text-sm text-gray-500">/ día completo</span>
        </p>
      </div>

      <ul class="mt-8 space-y-3">
        <li class="flex items-center">
          <span class="text-indigo-600 mr-2">✔️</span> Grabación ilimitada
        </li>
        <li class="flex items-center">
          <span class="text-indigo-600 mr-2">✔️</span> Mezcla y masterización full
        </li>
        <li class="flex items-center">
          <span class="text-indigo-600 mr-2">✔️</span> Producción ejecutiva
        </li>
        <li class="flex items-center">
          <span class="text-indigo-600 mr-2">✔️</span> Sesión de fotos promocional
        </li>
      </ul>

      <a
        href="#"
        class="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-6 py-3 text-center text-white font-medium hover:bg-indigo-700 transition"
      >
        Reservar
      </a>
    </div>

  </div>
</div>
  `,
    styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreciosComponent { }
