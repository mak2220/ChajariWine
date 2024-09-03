import clientPromise from '../../lib/mongodb';
import Joi from 'joi';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    direction: Joi.string().optional(),
    payment: Joi.string().required(),
    orderNumber: Joi.string().required(), // Añadir orderNumber al esquema
    cart: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required()
      })
    ).required()
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, phone, direction, payment, cart, orderNumber } = value; // Incluir orderNumber

  console.log("Validated data:", value); // Log the validated data

  try {
    const client = await clientPromise;
    const db = client.db('datosDeOperaciones');
    const collection = db.collection('compras');

    const newPurchase = {
      name,
      phone,
      direction: direction || '',
      payment,
      orderNumber, // Incluir orderNumber en el nuevo objeto
      cart,
      date: new Date()
    };

    const result = await collection.insertOne(newPurchase);
    res.status(200).json({ message: 'Compra registrada con éxito', data: result.insertedId });
  } catch (e) {
    console.error('Error al registrar la compra:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default handler;
