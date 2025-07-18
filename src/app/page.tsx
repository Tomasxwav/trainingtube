import { CTA } from '@/partials/home/CTA';
import { Features } from '@/partials/home/Features';
import { Footer } from '@/partials/home/Footer';
import { Header } from '@/partials/home/Header';
import { Hero } from '@/partials/home/Hero';
import { Roles } from '@/partials/home/Roles';

export default function Home() {

  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Roles />
      <CTA />
      <Footer />
    </div>
  );
}
