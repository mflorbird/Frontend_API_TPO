import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' // Añadimos Bootstrap
import './App.css'
import Destacados from './components/Destacados'  

function App() {
  return (
    <div className="container"> {/* Contenedor principal con Bootstrap */}
      <header className="my-4"> {/* Añadimos margen arriba y abajo */}
        <h1 className="text-center">Mi Sitio Web</h1>
      </header>

      <main>
        {/* Carrusel */}
        <section className="mb-5"> {/* Margen inferior */}
          <Destacados />
        </section>

        {/* Área de contenido adicional */}
        <section className="content-area">
          {/* Aquí puedes agregar más contenido */}
        </section>
      </main>

      <footer className="mt-4 text-center"> {/* Footer con margen superior */}
        <p>© 2024 Mi Sitio Web</p>
      </footer>
    </div>
  )
}

export default App