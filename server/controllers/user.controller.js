import User from "../models/user.model.js"
import Interview from "../models/interview.model.js"
import CreditsTransaction from "../models/creditsTransaction.model.js"


export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if(!user) {
            return res.status(404).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({message:`failed to get currentUser ${error}`})
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-__v");
        if (!user) return res.status(404).json({ message: "User not found" });

        const interviews = await Interview.find({ userId: req.userId, status: "completed" });
        const totalInterviews = interviews.length;
        const avgScore = totalInterviews
            ? (interviews.reduce((s, i) => s + (i.finalScore || 0), 0) / totalInterviews).toFixed(1)
            : 0;

        const transactions = await CreditsTransaction.find({ userId: req.userId })
            .sort({ createdAt: -1 })
            .limit(20)
            .select("type amount reason balanceAfter createdAt");

        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                photoUrl: user.photoUrl,
                credits: user.credits,
                streak: user.streak,
                badges: user.badges || [],
                createdAt: user.createdAt,
            },
            stats: {
                totalInterviews,
                avgScore: Number(avgScore),
                joinDate: user.createdAt,
            },
            transactions,
        });
    } catch (error) {
        return res.status(500).json({ message: `Failed to get profile: ${error}` });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { name, photoUrl } = req.body;
        const updates = {};
        if (name && typeof name === "string") updates.name = name.trim();
        if (photoUrl !== undefined) updates.photoUrl = photoUrl || "";

        const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Failed to update profile: ${error}` });
    }
}