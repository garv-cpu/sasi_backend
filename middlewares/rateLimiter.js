import rateLimiter from "../config/upstash.js";

const rateLimiterMiddleware = async (req, res, next) => {
    try {
        const ip = req.ip;
        const { success } = await rateLimiter.limit(ip); // maybe change it to my-rate-limit instead of ip
    
        if (!success) {
        return res.status(429).json({
            message: "Too many requests. Please try again later.",
        });
        }
    
        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        next(error);
    }
}

export default rateLimiterMiddleware;