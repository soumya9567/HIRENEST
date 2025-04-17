import User from "../models/User.js"; // Import User model

export const storeUser = async (req, res) => {
    console.log("Received request body:", req.body); // ✅ Debugging

    try {
        const { clerkId, email, name, status } = req.body;

        if (!status || (status !== "candidate" && status !== "recruiter")) {
            return res.status(400).json({ message: "Invalid status selected" });
        }

        let user = await User.findOne({ clerkId });

        if (!user) {
            user = await User.create({ clerkId, email, name, status });
            console.log("New user created:", user); // ✅ Debug log
        } else {
            console.log("User already exists:", user);
        }

        res.json({ message: "User stored successfully", user });
    } catch (error) {
        console.error("Error storing user:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


