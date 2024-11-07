import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StockInput = () => {
  const [stockItems, setStockItems] = useState([{ size: '', stock: '' }]);

  const addStockField = () => {
    setStockItems([...stockItems, { size: '', stock: '' }]);
  };

  const removeStockField = (index) => {
    const updatedStockItems = stockItems.filter((_, i) => i !== index);
    setStockItems(updatedStockItems);
  };

  return (
    <div>
      {stockItems.map((item, index) => (
        <div className="row mb-2" key={index}>
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Ingresa un talle" />
          </div>
          <div className="col-md-5">
            <input type="number" className="form-control" placeholder="Ingresa una cantidad" />
          </div>
          <div className="col-md-1 d-flex justify-content-end">
          <Button variant="outline-danger" onClick={() => removeStockField(index)}>
              <FaTrash />
            </Button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-outline-primary" onClick={addStockField}>
        + Agregar talle
      </button>
    </div>
  );
};

export default StockInput;
