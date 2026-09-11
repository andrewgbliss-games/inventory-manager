import { BackToTop } from "@/components/back-to-top";
import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolsSection } from "@/components/tools-section";
import { WorkflowSection } from "@/components/workflow-section";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ToolsSection />
        <WorkflowSection />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
