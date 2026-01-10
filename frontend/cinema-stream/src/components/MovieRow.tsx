import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie, fetchMovies } from '@/lib/api';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';

interface MovieRowProps {
  title: string;
  category: string;
  onInfoClick: (movie: Movie) => void;
}

export const MovieRow = ({ title, category, onInfoClick }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      const data = await fetchMovies(category);
      setMovies(data);
      setIsLoading(false);
    };

    loadMovies();
  }, [category]);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group py-4"
    >
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 px-4 md:px-8 lg:px-12">
        {title}
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-4 z-10 w-12 bg-gradient-to-r from-background via-background/80 to-transparent 
                     flex items-center justify-start pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft className="w-8 h-8 text-foreground" />
        </button>

        {/* Movie Row */}
        <div
          ref={rowRef}
          className="row-scroll px-4 md:px-8 lg:px-12"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))
            : movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onInfoClick={onInfoClick} />
              ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-4 z-10 w-12 bg-gradient-to-l from-background via-background/80 to-transparent 
                     flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="w-8 h-8 text-foreground" />
        </button>
      </div>
    </motion.section>
  );
};