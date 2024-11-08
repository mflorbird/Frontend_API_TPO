import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const StockInput = ({ stockItems, handleStockChange }) => {
  const addStockField = () => {
    handleStockChange([...stockItems, { size: '', stock: '' }]);
  };

  const removeStockField = (index) => {
    const updatedStockItems = stockItems.filter((_, i) => i !== index);
    handleStockChange(updatedStockItems);
  };

  const handleStockFieldChange = (e, index, field) => {
    const value = e.target.value;
  
    const updatedStockItems = [...stockItems];
    
    updatedStockItems[index] = {
      ...updatedStockItems[index],
      [field]: value
    };
  
    handleStockChange(updatedStockItems);
  };

  return (
    <div>
      {stockItems.map((item, index) => (
        <div className="row mb-2 g-2" key={index}>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              value={item.size}
              onChange={(e) => handleStockFieldChange(e, index, 'size')}
              placeholder="Ingresa un talle"
            />
          </div>
          <div className="col-md-5">
            <input
              type="number"
              className="form-control"
              value={item.stock}
              onChange={(e) => handleStockFieldChange(e, index, 'stock')}
              placeholder="Ingresa una cantidad"
            />
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
