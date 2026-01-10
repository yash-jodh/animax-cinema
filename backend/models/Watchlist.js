const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  animeId: { type: Number, required: true }, // mal_id from Jikan
  title: String,
  poster: String,
  rating: Number,
  releaseDate: String,
  url: String
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);