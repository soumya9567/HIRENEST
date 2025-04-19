// controllers/handleClerkWebhook.js
import crypto from 'crypto';

// Webhook handler to verify the Clerk webhook signature
const handleClerkWebhook = (req, res) => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  const signature = req.headers['clerk-signature'];

  // Log the request body and signature for debugging purposes
  console.log('Received Webhook:', req.body);
  console.log('Received Signature:', signature);

  // Compute the HMAC of the request body using the webhook secret
  const computedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== computedSignature) {
    return res.status(400).json({ message: 'Invalid webhook signature' });
  }

  // Process the webhook data (e.g., update user status)
  res.status(200).json({ message: 'Webhook verified successfully' });
};

export default handleClerkWebhook;
