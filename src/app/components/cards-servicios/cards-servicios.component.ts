import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-cards-servicios",
  imports: [],
  template: `
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      <!-- Grabación de Voces -->
      <a
        href="#"
        class="group relative block bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        <img
          alt="Grabación de voces"
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-50 transition duration-500 transform group-hover:scale-110"
        />

        <div class="relative p-6 flex flex-col justify-end h-full">
          <p
            class="text-sm font-medium tracking-widest text-yellow-400 uppercase"
          >
            Servicio
          </p>
          <p class="text-2xl font-bold text-white">Grabación de Voces</p>

          <div
            class="mt-32 opacity-0 translate-y-8 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <p class="text-sm text-white">
              Captura la esencia de tu voz en cabinas acústicamente tratadas,
              con micrófonos de alta gama.
            </p>
          </div>
        </div>
      </a>

      <!-- Producción Musical -->
      <a
        href="#"
        class="group relative block bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        <img
          alt="Producción Musical"
          src="https://images.unsplash.com/photo-1585666176811-45c61b840ad4?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-50 transition duration-500 transform group-hover:scale-110"
        />

        <div class="relative p-6 flex flex-col justify-end h-full">
          <p
            class="text-sm font-medium tracking-widest text-green-400 uppercase"
          >
            Servicio
          </p>
          <p class="text-2xl font-bold text-white">Producción Musical</p>

          <div
            class="mt-32 opacity-0 translate-y-8 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <p class="text-sm text-white">
              Desde el arreglo hasta la masterización, creamos tu música con
              calidad de industria.
            </p>
          </div>
        </div>
      </a>

      <!-- Mezcla y Masterización -->
      <a
        href="#"
        class="group relative block bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        <img
          alt="Mezcla y Masterización"
          src="https://images.unsplash.com/photo-1559732277-7453b141e3a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-50 transition duration-500 transform group-hover:scale-110"
        />

        <div class="relative p-6 flex flex-col justify-end h-full">
          <p
            class="text-sm font-medium tracking-widest text-blue-400 uppercase"
          >
            Servicio
          </p>
          <p class="text-2xl font-bold text-white">Mezcla y Masterización</p>

          <div
            class="mt-32 opacity-0 translate-y-8 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <p class="text-sm text-white">
              Consigue un sonido profesional, potente y pulido que hará destacar
              tus canciones.
            </p>
          </div>
        </div>
      </a>
    </div>
  `,
   styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsServiciosComponent {}
