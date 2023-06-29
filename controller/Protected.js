require('dotenv').config();

const protected = (req, res) => {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

      // Fetch user details from the database based on the decoded userId

      // Example:
      // const user = await User.findById(decoded.userId);

      res.status(200).json({ message: 'Protected route accessed successfully' });
    } catch (error) {
      console.error('Error accessing protected route:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }


  exports.protected =protected;