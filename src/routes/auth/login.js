module.exports = (req, res) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    user: req.body
  });
};