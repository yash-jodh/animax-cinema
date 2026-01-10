import { Play, Info, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie } from '@/lib/api';
import axios from 'axios';
import { toast } from 'sonner';

interface MovieCardProps {
  movie: Movie;
  onInfoClick: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onInfoClick }: MovieCardProps) => {
  const handleCardClick = () => {
    if (movie.url) {
      window.open(movie.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onInfoClick(movie);
  };

  const handleAddToList = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error("Please login to add to your list");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/watchlist/add', movie, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`${movie.title} added to My List`);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Failed to add to list");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="movie-card flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] aspect-[2/3] group relative"
      onClick={handleCardClick}
    >
      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover rounded-md" loading="lazy" />
      
      <div className="movie-card-overlay flex flex-col justify-end p-3">
        <div className="flex items-center gap-2 mb-2">
          <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
            <Play className="w-4 h-4 text-primary-foreground fill-current" />
          </button>
          <button 
            onClick={handleAddToList}
            className="w-8 h-8 rounded-full bg-secondary/80 border border-muted-foreground/30 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <Plus className="w-4 h-4 text-foreground" />
          </button>
          <button 
            onClick={handleInfoClick} 
            className="w-8 h-8 rounded-full bg-secondary/80 border border-muted-foreground/30 flex items-center justify-center hover:bg-secondary transition-colors ml-auto"
          >
            <Info className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2">{movie.title}</h3>
      </div>
    </motion.div>
  );
};