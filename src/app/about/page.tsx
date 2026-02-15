import type { Metadata } from 'next';
import StorySection from '@/components/about/StorySection';
import TeamGrid from '@/components/about/TeamGrid';

export const metadata: Metadata = {
  title: 'About Us | Van Nails',
  description: 'Learn about Van Nails and meet our talented team of nail technicians.',
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <StorySection />
      <TeamGrid />
    </div>
  );
}
