import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Events } from "@/components/landing/Events";
import { EventHeads } from "@/components/landing/EventHeads";
import { Artists } from "@/components/landing/Artists";
import { Gallery } from "@/components/landing/Gallery";
import { Testimonials } from "@/components/landing/Testimonials";
import { ArtistForm } from "@/components/landing/ArtistForm";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Events />
        <EventHeads />
        <Artists />
        <Gallery />
        <Testimonials />
        <ArtistForm />
      </main>
      <Footer />
    </div>
  );
}
