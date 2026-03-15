import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      <section className="bg-gradient-to-r from-primary-400 to-accent text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mango Marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Fresh mangoes from Rajshahi, delivered to your door
          </p>
          {isAuthenticated ? (
            <p className="text-lg">Welcome back, {user?.firstName}!</p>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" variant="secondary">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline">
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
