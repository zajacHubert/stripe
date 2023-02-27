import axios from 'axios';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51MffZeG8WCt8ZEmFyzUO4HqTWuvChtZFXE79MUHeVolHZyrpo2fkur2X2UyVKEdcfGFHRHCuafHD7Q70SprflO0q00IAqRnIem'
);

const HomePage: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:3004/products');
      setProducts(res.data);
    })();
  }, []);

  const handleOrder = async (productId: string) => {
    const stripeResp = await axios('/api/order');
    const { id: sessionId } = stripeResp.data;

    const stripe = await stripePromise;
    const { error } = (await stripe?.redirectToCheckout({ sessionId })) as any;
    console.log(error);
  };

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} - {product.price.toFixed(2)}zł{' '}
          <button onClick={() => handleOrder(product.id)}>Buy</button>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
