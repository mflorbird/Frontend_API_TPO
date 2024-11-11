import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SizeGuide.css';

const SizeGuide = () => {
  return (
    <>
      <Navbar />

      <div className="size-guide container my-5">
        <h1 className="text-center mt-120">Guía de talles</h1>
        <p className="text-center font-weight-bold mt-4">
          Encontrá tu talle ideal para tus zapatillas Naikii. Seguí nuestra guía y medí tu pie correctamente.
        </p>

        <section className="size-instructions mt-5">
          <h4>¿Cómo medir tu pie?</h4>
          <p className="mb-3">
            Colocá una hoja de papel en el piso contra la pared. Parate sobre la hoja con el talón tocando la pared. Marcá la longitud del dedo más largo y medí la distancia en centímetros. Después, usá la tabla para encontrar tu talle.
          </p>
        </section>

        <section className="size-tables mt-5">
          <h4 className="text-center">Tabla de talles</h4>
          
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-4">
              <thead>
                <tr>
                  <th>Longitud del pie (cm)</th>
                  <th>Talle EU (Hombres)</th>
                  <th>Talle US (Hombres)</th>
                  <th>Talle EU (Mujeres)</th>
                  <th>Talle US (Mujeres)</th>
                  <th>Talle EU (Niños)</th>
                  <th>Talle US (Niños)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>22.5</td>
                  <td>36</td>
                  <td>4</td>
                  <td>36</td>
                  <td>5.5</td>
                  <td>30</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>23.5</td>
                  <td>37.5</td>
                  <td>5</td>
                  <td>37.5</td>
                  <td>6.5</td>
                  <td>31</td>
                  <td>13</td>
                </tr>
                <tr>
                  <td>24.5</td>
                  <td>39</td>
                  <td>6</td>
                  <td>39</td>
                  <td>7.5</td>
                  <td>32</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>25.5</td>
                  <td>40.5</td>
                  <td>7</td>
                  <td>40.5</td>
                  <td>8.5</td>
                  <td>33</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>26.5</td>
                  <td>42</td>
                  <td>8</td>
                  <td>42</td>
                  <td>9.5</td>
                  <td>34</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>27.5</td>
                  <td>43.5</td>
                  <td>9</td>
                  <td>43.5</td>
                  <td>10.5</td>
                  <td>35</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>28.5</td>
                  <td>45</td>
                  <td>10</td>
                  <td>45</td>
                  <td>11.5</td>
                  <td>36</td>
                  <td>5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-center mt-5 mb-130 font-weight-bold">
          Si tenés alguna duda sobre el talle, contactá a nuestro equipo de atención al cliente.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default SizeGuide;
