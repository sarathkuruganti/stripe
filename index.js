const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51PrZX92KdWd4ur2O4AdkpohkljHYPf8CBHlMjtojpS8GHPCcF2xJVB9nTacxVKPIVGRBUdPDTONqpBpF5cDitWMb0026nXRyMV'); // Replace with your Stripe secret key

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { publishableKey: 'pk_test_51PrZX92KdWd4ur2O9iLpdFwe1KUhDZ8saH3McMlZlTAHdVQ7ECplo8baPHwG1bBDEwmH4F2ORlJw2OfAkd4od6Bn00SKHtdDTH' }); // Replace with your Stripe publishable key
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'gbp',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/api', (req, res) => {
  res.json({ "msg": "Hello world" });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
