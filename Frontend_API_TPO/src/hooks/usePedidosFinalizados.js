import { useState, useEffect } from 'react';

const usePedidosFinalizados = () => {
  const [pedidos, setPedidos] = useState([]);
  
  useEffect(() => {
    // esto despues lo tengo que modificar por la api. 
    const pedidosFinalizados = JSON.parse(localStorage.getItem('pedidosFinalizados')) || [];
    setPedidos(pedidosFinalizados);
  }, []);

  return pedidos;
};

export default usePedidosFinalizados;
