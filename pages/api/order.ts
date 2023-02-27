import type { NextApiRequest, NextApiResponse } from 'next';
const stripe = require('stripe')(process.env.STRIPE_SECRET, {
  apiVersion: '2022-11-15',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripeObj = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    payment_method_types: ['card', 'p24'],
    line_items: [
      {
        price: 'price_1Mfg97G8WCt8ZEmFyzL27Ikb',
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  res.json(stripeObj);
};

export default handler;
