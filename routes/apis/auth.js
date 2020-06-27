const express = require('express'),
  router = express.Router();
const auth = require('../../controller/authController');
const User = require('../../models/User');
// @Route Get api/auth
// @desc  auth route
// @access Pulbic
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
