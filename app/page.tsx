import { CTASection } from "@/components/CTASection";
import { CapabilitySection } from "@/components/home/CapabilitySection";
import { FAQ } from "@/components/home/FAQ";
import { Hero } from "@/components/home/Hero";
import { MethodSection } from "@/components/home/MethodSection";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrustSection } from "@/components/home/TrustSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MethodSection />
      <ServicesSection />
      <CapabilitySection />
      <TrustSection />
      <ProjectsPreview />
      <FAQ />
      <CTASection />
    </>
  );
}

