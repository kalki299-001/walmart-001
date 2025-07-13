import { Header } from '@/components/Header';
import { StatsOverview } from '@/components/creator-studio/StatsOverview';
import { QuickActions } from '@/components/creator-studio/QuickActions';
import { ProductSelection } from '@/components/creator-studio/ProductSelection';
import { StreamSetup } from '@/components/creator-studio/StreamSetup';
import { RecentStreams } from '@/components/creator-studio/RecentStreams';

interface CreatorStudioProps {
  onMenuClick: () => void;
}

export const CreatorStudio = ({ onMenuClick }: CreatorStudioProps) => {
  return (
    <>
      <Header title="Creator Studio" onMenuClick={onMenuClick} showSearch={false} />
      
      <main className="pt-20 pb-4 h-screen overflow-y-auto bg-black text-white">
        <div className="px-6 space-y-6">
          <StatsOverview />
          <QuickActions />
          <ProductSelection />
          <StreamSetup />
          <RecentStreams />
        </div>
      </main>
    </>
  );
};