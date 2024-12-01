import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {catalogService} from '../services/catalogService';
import '../styles/profile.css';
import {cartService} from '../services/cartService';
import { Link } from 'react-router-dom';
import { BsBagCheckFill  } from "react-icons/bs";

const Perfil = () => {
    const [activeTab, setActiveTab] = useState('datos');
    const { user } = useContext(AppContext);
    const [pedidos, setPedidos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.favoritos) {
            const fetchFavoritos = async () => {
                try {
                    const productosFavoritos = await catalogService.getFavoriteProducts();
                    setFavoritos(productosFavoritos);
                } catch (error) {
                    console.error('Error al cargar los productos favoritos:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchFavoritos();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const fetchPedidos = async () => {
                try {
                    const pedidos = await cartService.getClosedCartsByUserId();
                    setPedidos(pedidos);
                } catch (error) {
                    console.error('Error al cargar los pedidos:', error);
                }
            };

            fetchPedidos();
        }
    }, [user]);

    if (!user) {
        return <p>No se encontró el usuario.</p>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Puedes ajustar el formato aquí
    };

    return (
        <div className="perfil-container">
            <h1>Hola {user.nombre}</h1>

            <div className="perfil-tabs">
                <button
                    className={activeTab === 'datos' ? 'active' : ''}
                    onClick={() => setActiveTab('datos')}
                >
                    Mis datos
                </button>
                <button
                    className={activeTab === 'pedidos' ? 'active' : ''}
                    onClick={() => setActiveTab('pedidos')}
                >
                    Mis pedidos
                </button>
                <button
                    className={activeTab === 'favoritos' ? 'active' : ''}
                    onClick={() => setActiveTab('favoritos')}
                >
                    Mis favoritos
                </button>
            </div>

            <div className="perfil-content">
                {activeTab === 'datos' && (
                    <div>
                        <h2>Mis datos</h2>
                        <div className="perfil-form">
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" value={user.nombre} disabled />
                            </div>
                            <div className="form-group">
                                <label>Apellido</label>
                                <input type="text" value={user.apellido} disabled />
                            </div>
                            <div className="form-group">
                                <label>Correo electrónico</label>
                                <input type="email" value={user.email} disabled />
                            </div>
                            <div className="form-group">
                                <label>Usuario</label>
                                <input type="text" value={user.usuario} disabled />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'pedidos' && (
                    <div>
                        <h2>Mis Pedidos Finalizados</h2>
                        {pedidos.length > 0 ? (
                            pedidos.map((pedido) => (
                                <div key={pedido.id} className="pedido-card">
                                    <p>Fecha de compra: {formatDate(pedido.closedAt)}</p>
                                    <div className="pedido-content">
                                        <BsBagCheckFill  style={{ fontSize: '2rem', color: 'darkblue', marginRight: '1rem', marginBottom: '1rem' }} />
                                        <div className="pedido-detalle">
                                            <p>
                                                {pedido.items && Object.values(pedido.items).map((item, index) => (
                                                    <div key={index}>
                                                        {item.model} - {item.quantity} unidades - Talle {item.size}
                                                    </div>
                                                ))}
                                            </p>
                                        </div>
                                        <p className="pedido-total">Total: ${pedido.precioDiscount}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No tienes pedidos finalizados.</p>
                        )}
                    </div>
                )}

                {activeTab === 'favoritos' && (
                    <div>
                        <h2>Mis Favoritos</h2>
                        {loading ? (
                            <p>Cargando favoritos...</p>
                        ) : (
                            <div className="favoritos-list">
                                {favoritos.length > 0 ? (
                                    favoritos.map((producto) => (
                                        <div key={producto.id} className="favorito-item">
                                            <img src={producto.image} alt={producto.name} className="favorito-image" />
                                            <div className="favorito-details">
                                                <h4>{producto.name}</h4>
                                                <p>{producto.description}</p>
                                                <span>${producto.price}</span>
                                                <Link to={`/producto/${producto.id}`} className="btn btn-primary mt-2">
                                                    Ver Producto
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No tienes productos favoritos.</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Perfil;
