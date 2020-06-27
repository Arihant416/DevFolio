const express = require('express'),
  router = express.Router();
const auth = require('../../controller/authController');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
// @Route Get api/profile/me
// @desc  Get Current Users profile
// @access Pulbic
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res
        .status(400)
        .json({ message: 'No profile exists for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
