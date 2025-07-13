
import { Home } from './Home';

interface IndexProps {
  onMenuClick: () => void;
}

const Index = ({ onMenuClick }: IndexProps) => {
  return <Home onMenuClick={onMenuClick} />;
};

export default Index;
