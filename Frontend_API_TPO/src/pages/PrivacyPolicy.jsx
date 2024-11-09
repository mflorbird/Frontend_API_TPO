import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/TermsAndConditions.css';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="privacy-policy container my-5">
        <h1 className="text-center">Política de Privacidad</h1>
        <p className="text-uppercase text-center font-weight-bold mt-4">
          POR FAVOR LEA ESTE DOCUMENTO CUIDADOSAMENTE Y NO UTILICE LA PÁGINA WEB WWW.NAIKII.COM.AR SI NO ESTÁ DE ACUERDO CON NUESTRA POLÍTICA DE PRIVACIDAD.
        </p>

        <section className="mt-5">
          <h2>Bienvenido a la Política de Privacidad de Naikii</h2>
          <p>
            La presente Política de Privacidad detalla cómo Southbay S.R.L., socio de Naikii Inc. y responsable de la operación del sitio www.naikii.com.ar, recopila, utiliza, comparte y protege los datos personales de los usuarios al interactuar con la página web.
          </p>
          <p>
            Al utilizar la página, usted acepta y consiente el tratamiento de sus datos personales según lo descrito en esta política. Si no está de acuerdo, le solicitamos que no utilice la página web.
          </p>
        </section>

        <section className="mt-5">
          <h3>1. Recopilación y Uso de Datos Personales</h3>
          <p>
            Southbay recopila datos personales cuando los usuarios realizan compras, crean cuentas, solicitan información o participan en eventos, entre otras interacciones. Los datos personales que recopilamos pueden incluir:
            <ul>
              <li>Información de contacto</li>
              <li>Detalles de acceso a la cuenta</li>
              <li>Información de pago</li>
              <li>Preferencias de marketing</li>
              <li>Características físicas</li>
              <li>Identificadores de dispositivo y direcciones IP (recogidos automáticamente a través de cookies y tecnologías similares)</li>
            </ul>
            Usamos estos datos para:
            <ul>
              <li>Proporcionar y gestionar la plataforma y los servicios solicitados.</li>
              <li>Enviar información sobre productos y servicios de Naikii, con su consentimiento.</li>
              <li>Operar y mejorar los servicios y la plataforma.</li>
              <li>Realizar investigaciones para comprender el comportamiento de los usuarios en la página.</li>
            </ul>
          </p>

          <hr className="my-4" /> {/* Divider */}

          <h3 className="mt-3">2. Transferencia y Conservación de Datos</h3>
          <p>
            Los datos personales se almacenan en Argentina, pero pueden transferirse a otros países, incluido Estados Unidos, bajo medidas de protección adecuadas. Conservamos los datos mientras sea necesario para cumplir con los fines descritos en esta política, incluyendo el cumplimiento de obligaciones legales.
          </p>

          <hr className="my-4" /> {/* Divider */}

          <h3 className="mt-3">3. Derechos de los Usuarios</h3>
          <p>
            Los usuarios tienen derecho a solicitar el acceso, corrección, eliminación o restricción de sus datos personales. También pueden revocar el consentimiento en cualquier momento y optar por no recibir comunicaciones de marketing. Los usuarios pueden ajustar sus preferencias de publicidad en su navegador o dispositivo móvil.
          </p>

          <hr className="my-4" /> {/* Divider */}

          <h3 className="mt-3">4. Cookies y Herramientas de Seguimiento</h3>
          <p>
            Utilizamos cookies y herramientas de seguimiento, como etiquetas de píxeles, para recopilar información sobre la interacción con la página. Esto nos ayuda a mejorar la experiencia y personalizar el contenido. Los usuarios pueden gestionar estas cookies desde la configuración de sus navegadores, aunque esto podría afectar algunas funcionalidades del sitio.
          </p>

          <hr className="my-4" /> {/* Divider */}

          <h3 className="mt-3">5. Contacto y Cambios en la Política</h3>
          <p>
            Nos comprometemos a mantener actualizada nuestra política de privacidad. En caso de cambios significativos, los usuarios serán notificados. Si tiene preguntas, comentarios o desea ejercer sus derechos relacionados con la protección de datos, puede contactarnos a través del correo electrónico soco.legal@southbay.com.ar.
          </p>
        </section>

        <p className="text-center mt-5 font-weight-bold">Gracias por leer nuestra Política de Privacidad. ¡Nos importa tu privacidad!</p>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
