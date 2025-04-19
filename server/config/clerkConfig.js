// config/clerkConfig.js
import { Clerk } from '@clerk/clerk-sdk-node';

const clerk = new Clerk({
  apiKey: process.env.CLERK_API_KEY, // Your Clerk API Key
  apiVersion: '2025-04-10',          // API version you want to use (make sure it's up to date)
});

export { clerk };
