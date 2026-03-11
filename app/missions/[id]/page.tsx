import { tugasData } from '@/lib/tugasData';
import MissionDetailClient from './MissionDetailClient';

export function generateStaticParams() {
  return tugasData.map((t) => ({
    id: String(t.id),
  }));
}

export default function MissionDetailPage() {
  return <MissionDetailClient />;
}
