import Navbar from './components/Navbar';
import MoviePortfolio from './components/MoviePortfolio';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MoviePortfolio />
      </main>
      <Footer />
    </div>
  );
}

export default App;