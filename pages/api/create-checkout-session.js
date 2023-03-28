//path = hostname/api/name-of-file

//this is backend code so we need to initialize stripe again but now with require coz it's like node.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function createCheckoutSession(req, res) {
  const { items, email } = req.body

  const transformedItems = items.map((item) => ({
    quantity: item.count,
    price_data: {
      currency: 'gbp',
      unit_amount: item.price * 100, // price
      //stripe take a price in subcurrency like USD - Cents , so you need to convert it that's why you need to put
      //100 here , our price is in gbp bur stripe thinks that its cents so you need to multiply it by a hundread
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }))

  const session = await stripe.checkout.sessions.create({
    // we give info to stripe and it gives us back an session id
    payment_method_types: ['card'],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 5, currency: 'gbp' },
          display_name: 'Next-day Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 3 },
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    //we are codding locally, but there we need to give full url , so we need to put the host name or headers.origin
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      // metadata is some additional data to request , we but here an email coz we'll use it to connect to firebase
      images: JSON.stringify(items.map((item) => item.image)),
    },
  })

  res.status(200).json({ id: session.id }) // now we can use that session id

  // the structure of returned api object is like { data : { id } }
}
