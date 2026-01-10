import { X, Play, Plus, ThumbsUp, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from '@/lib/api';
import { useState } from 'react';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  const [isMuted, setIsMuted] = useState(true);

  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-y-10 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-4xl 
                       bg-card rounded-lg overflow-hidden z-50 flex flex-col max-h-[90vh]"
          >
            {/* Backdrop Image */}
            <div className="relative aspect-video flex-shrink-0">
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm 
                           flex items-center justify-center hover:bg-card transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    Play
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border-2 border-muted-foreground/50 
                               flex items-center justify-center hover:border-foreground transition-colors"
                  >
                    <Plus className="w-5 h-5 text-foreground" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border-2 border-muted-foreground/50 
                               flex items-center justify-center hover:border-foreground transition-colors"
                  >
                    <ThumbsUp className="w-5 h-5 text-foreground" />
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full border-2 border-muted-foreground/50 
                             flex items-center justify-center hover:border-foreground transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-foreground" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-foreground" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2">
                  {/* Meta Info */}
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
                    <span className="text-muted-foreground">{movie.releaseDate}</span>
                    <span className="px-2 py-0.5 border border-muted-foreground text-muted-foreground text-xs">HD</span>
                  </div>

                  {/* Synopsis */}
                  <p className="text-foreground text-sm md:text-base leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>

                {/* Sidebar */}
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Genre: </span>
                    <span className="text-foreground">{movie.genre}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating: </span>
                    <span className="text-foreground">{movie.rating}/10</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Release Date: </span>
                    <span className="text-foreground">{movie.releaseDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};