require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const app = express();

// Middleware for parsing JSON body
app.use(express.json())
// app.use(express.json());

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/checkout', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'nodejs and express book'
                        },
                        unit_amount: 50 * 100
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['US', 'IN']
            },
            success_url: `http://localhost:8000/complete?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:8000/cancel'
        });
        res.redirect(session.url);
    } catch (error) {
        console.error('Error in /checkout:', error);
        res.status(500).send('Something went wrong');
    }
});

app.get('/complete', async (req, res) => {
    try {
        const result = await Promise.all([
            stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
            stripe.checkout.sessions.listLineItems(req.query.session_id)
        ]);
        console.log(result);
        res.send('Payment is successful');
    } catch (error) {
        console.error('Error in /complete:', error);
        res.status(500).send('Something went wrong');
    }
});

app.get('/cancel', (req, res) => {
    res.redirect('/');
});

// Subscription route
app.get('/subscribe', async (req, res) => {
    try {
        const plan = req.query.plan;
        let planId;
        switch (plan.toLowerCase()) {
            case 'basics':
                planId = 'price_1QClOHCyXl1FHeFJ2p5GjURM';
                break;
            case 'pro':
                planId = 'price_1QClP5CyXl1FHeFJlUmTkpHD';
                break;
            default:
                return res.send('Subscription not found!');
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [{ price: planId, quantity: 1 }],
            mode: 'subscription',
            success_url: `http://localhost:8000/successfull?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:8000/cancel"
        });

        res.redirect(session.url);
    } catch (error) {
        console.error('Error in /subscribe:', error);
        res.status(500).send('Something went wrong');
    }
});

app.get('/successfull', (req, res) => {
    res.send('Subscribed successfully!');
});

app.get('/customer/:customerId', async (req, res) => {
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: req.params.customerId,
            return_url: `http://localhost:8000/`
        });
        res.redirect(portalSession.url);
    } catch (error) {
        console.error('Error in /customer/:customerId:', error);
        res.status(500).send('Something went wrong');
    }
});

// Webhook for Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            request.body, // use the raw body here
            sig,
            endpointSecret
        );
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            console.log('New subscriber is created');
            console.log(event.data);
            break;
        case 'invoice.paid':
            console.log('Invoice paid');
            console.log(event.data);
            break;
        case 'invoice.payment_failed':
            console.log('Invoice payment failed');
            console.log(event.data);
            break;
        case 'customer.subscription.updated':
            console.log('Subscription updated');
            console.log(event.data);
            break;
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});