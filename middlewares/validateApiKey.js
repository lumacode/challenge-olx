const validateApiKey = (req, res, next) => 
{
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ error: 'Access denied.' });

    try {
        if(token === process.env.APP_API_KEY) return next();
        res.status(401).json({ error: 'Access denied.' });
    } catch (error) {
        res.status(401).json({ error: 'Access denied.' });
    }
}


module.exports = validateApiKey;