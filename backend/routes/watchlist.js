const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Watchlist = require('../models/Watchlist'); 

// GET user watchlist
router.get('/', auth, async (req, res) => {
  try {
    const items = await Watchlist.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// ADD to watchlist
router.post('/add', auth, async (req, res) => {
  try {
    const { id, title, poster, rating, releaseDate, url } = req.body;
    
    // Check if already in list
    const existing = await Watchlist.findOne({ userId: req.user.id, animeId: id });
    if (existing) return res.status(400).json({ msg: "Already in your list" });

    const newItem = new Watchlist({
      userId: req.user.id,
      animeId: id,
      title, poster, rating, releaseDate, url
    });

    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;