import TopBanner from "@/components/layout/TopBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import SegmentShowcase from "@/components/sections/SegmentShowcase";
import PlatformModules from "@/components/sections/PlatformModules";
import DeploymentProcess from "@/components/sections/DeploymentProcess";
import Pricing from "@/components/sections/Pricing";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <SegmentShowcase />
        <PlatformModules />
        <DeploymentProcess />
        <Pricing />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
