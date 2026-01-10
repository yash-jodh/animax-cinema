import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MovieRow } from '@/components/MovieRow';
import { MovieModal } from '@/components/MovieModal';
import { Movie } from '@/lib/api';

const TVShows = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      
      <main className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground px-4 md:px-8 lg:px-12 mb-8">
          TV Shows
        </h1>
        
        <MovieRow 
          title="Popular Shows" 
          category="trending" 
          onInfoClick={handleInfoClick} 
        />
        <MovieRow 
          title="Critically Acclaimed" 
          category="topRated" 
          onInfoClick={handleInfoClick} 
        />
      </main>

      <MovieModal 
        movie={selectedMovie} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default TVShows;