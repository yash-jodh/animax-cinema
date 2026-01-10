import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { MovieRow } from '@/components/MovieRow';
import { MovieModal } from '@/components/MovieModal';
import { Movie } from '@/lib/api';

const Index = () => {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection onInfoClick={handleInfoClick} />
        
        <div className="-mt-32 relative z-10 pb-16">
          <MovieRow 
            title="Trending Now" 
            category="trending" 
            onInfoClick={handleInfoClick} 
          />
          <MovieRow 
            title="Top Rated" 
            category="topRated" 
            onInfoClick={handleInfoClick} 
          />
          <MovieRow 
            title="Action Thrillers" 
            category="action" 
            onInfoClick={handleInfoClick} 
          />
        </div>
      </main>

      <MovieModal 
        movie={selectedMovie} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default Index;