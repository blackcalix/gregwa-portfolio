import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  );
}