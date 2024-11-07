import React from 'react';

const ProductImagePreview = ({ src, alt }) => (
  <div>
    <img src={src} alt={alt} className="img-fluid mb-3" style={{ maxWidth: '200px' }} />
  </div>
);

export default ProductImagePreview;
