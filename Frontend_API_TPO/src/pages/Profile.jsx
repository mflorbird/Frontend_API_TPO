import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Mi Perfil</h1>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;