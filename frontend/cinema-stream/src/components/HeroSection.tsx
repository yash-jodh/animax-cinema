import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie, featuredMovie } from '@/lib/api';

interface HeroSectionProps {
  onInfoClick: (movie: Movie) => void;
}

export const HeroSection = ({ onInfoClick }: HeroSectionProps) => {
  
  const handlePlayClick = () => {
    // Redirect logic: opens the anime's official/MAL page in a new tab
    if (featuredMovie.url) {
      window.open(featuredMovie.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="relative h-[70vh] md:h-[85vh] lg:h-screen w-full overflow-hidden">
      {/* Background Image - Uses backdrop from real Jikan data */}
      <div className="absolute inset-0">
        <img
          src={featuredMovie.backdrop}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays for CINEMAX aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-20 md:pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl lg:max-w-2xl"
          >
            {/* Featured Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-primary font-bold text-sm tracking-widest uppercase">
                ANIMAX Original
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 text-shadow-lg">
              {featuredMovie.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-3 mb-4 text-sm md:text-base">
              <span className="text-green-500 font-semibold">{Math.round(featuredMovie.rating * 10)}% Match</span>
              <span className="text-muted-foreground">{featuredMovie.releaseDate}</span>
              <span className="px-2 py-0.5 border border-muted-foreground text-muted-foreground text-xs">HD</span>
              <span className="text-muted-foreground">{featuredMovie.genre}</span>
            </div>

            {/* Synopsis */}
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-6 line-clamp-3 md:line-clamp-none">
              {featuredMovie.synopsis}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlayClick}
                className="btn-primary text-base lg:text-lg"
              >
                <Play className="w-5 h-5 lg:w-6 lg:h-6 fill-current" />
                Play
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onInfoClick(featuredMovie)}
                className="btn-secondary text-base lg:text-lg"
              >
                <Info className="w-5 h-5 lg:w-6 lg:h-6" />
                More Info
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};