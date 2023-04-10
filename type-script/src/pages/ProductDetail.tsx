import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../api/product';

interface IProduct {
  id: string | number;
  name: string;
  price: number;
  images: string;
  description: string;
  categoryId:number |string
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct>({
    id: '',
    name: '',
    price: 0,
    images: '',
    description: '',
    categoryId:''
  });

  useEffect(() => {
    getOneProduct(id).then(({ data }) => setProduct(data));
  }, [id]);

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "150px"}}>
       <div><img style={{ width: '350px' }} src={product.images} alt={product.images} /></div> 
       <div> <h1>{product.name}</h1>
        <h2 style={{color:"red"}}>{product.price}</h2>
        <h3>{product.description}</h3>
           <button style={{ backgroundColor: 'violet',color:"white",padding:"15px 30px" }}> Mua ngay</button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetail;
