import Navbar from '@/components/layout/Navbar';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Portfolio from '@/components/sections/Portfolio';
import AiProjects from '@/components/sections/AiProjects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <AiProjects />
        <About />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
