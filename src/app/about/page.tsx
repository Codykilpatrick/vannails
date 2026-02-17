import type { Metadata } from 'next';
import StorySection from '@/components/about/StorySection';
import TeamGrid from '@/components/about/TeamGrid';

export const metadata: Metadata = {
  title: 'About Us | Vivid Nails',
  description: 'Learn about Vivid Nails and meet our talented team of nail technicians.',
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <StorySection />
      <TeamGrid />
    </div>
  );
}
