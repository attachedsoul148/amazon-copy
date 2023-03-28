import { buffer } from 'micro'
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

//Firebase Admin SDK private key generation file
const serviceAccount = require('../../permissions.json')

//we need to check if app is already exists , coz we never want to initialize app twice to one user
const app = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
    })
  : getApp()

const db = getFirestore(app)
//stripe initialization
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET //webhook listener key

const fullfillOrder = async (session) => {
  //TODO: adding orders logic
  return db
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100, //coz of subcurrency
      amount_shipping: session.total_details.amount_shipping,
      images: JSON.parse(session.metadata.images),
      timestamp: FieldValue.serverTimestamp(),
    })
}

export default async function webhook(req, res) {
  if (req.method === 'POST') {
    const reqBuffer = await buffer(req)
    const payload = reqBuffer.toString()
    const sig = req.headers['stripe-signature']

    let event

    //Verify that event came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
      console.log(err.message)
      return res.status(400).send(`Error : ${err.message}`)
    }

    //handle session completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      //fullfill the order
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => {
          res.status(400)
          console.log(`Webhook error ${err.message}`)
        })
    }
  }
}

export const config = {
  api: {
    bodyParser: false, //need to disable it for webhooks , read more in google
    externalResolver: true, // request will be resolved not by us but by stripe
  },
}
