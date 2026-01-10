import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { MovieCard } from '@/components/MovieCard';
import { MovieModal } from '@/components/MovieModal';
import { Movie } from '@/lib/api';
import { Film, Loader2 } from 'lucide-react';
import axios from 'axios';

const MyList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem('token');
      
      // 1. Route Protection: Redirect if not logged in
      if (!token) {
        navigate('/auth');
        return;
      }

      try {
        setIsLoading(true);
        // 2. Fetch user-specific list from your Node.js backend
        const response = await axios.get('http://localhost:5000/api/watchlist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, [navigate]);

  const handleInfoClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <Navbar />
      
      <main className="py-8 px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          My List
        </h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : movies.length > 0 ? (
          // 3. Display saved movies using your existing MovieCard component
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onInfoClick={handleInfoClick} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <Film className="w-20 h-20 text-muted-foreground mb-4" />
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
              Your list is empty
            </h2>
            <p className="text-muted-foreground max-w-md">
              Movies you add to your list will appear here for quick access.
            </p>
          </div>
        )}
      </main>

      <MovieModal 
        movie={selectedMovie} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default MyList;