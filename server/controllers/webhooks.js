import User from "../models/User.js"


export const clerkWebhooks = async (req, res) => {
    try {
      const signature = req.headers['clerk-signature']; 
      const isValidSignature = verifyClerkSignature(signature, req.body); 
  
      if (!isValidSignature) {
        return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
      }
  
      const { data, type } = req.body;
  
      switch (type) {
        case 'user.created':
          const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
            resume: ''
          };
          await User.create(userData);
          res.json({});
          break;
  
        case 'user.updated':
          const updatedUserData = {
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
            resume: ''
          };
          await User.findByIdAndUpdate(data.id, updatedUserData);
          res.json({});
          break;
  
        case 'user.deleted':
          await User.findByIdAndDelete(data.id);
          res.json({});
          break;
  
        default:
          res.status(400).json({ success: false, message: 'Unknown webhook type' });
          break;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  