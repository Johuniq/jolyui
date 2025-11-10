// import EventToast from "@/components/event-toast";
import { ComponentShowcaseCard } from "@/components/landing/component-showcase-card";
import { HeroSection } from "@/components/landing/hero";
import { InteractivePreview } from "@/components/landing/interactive-preview";
import { BuildInterfacesCard } from "@/components/landing/interfaceCards";

import { TechnologyBadges } from "@/components/landing/technology-badges";

export default function Home() {
    return (
        <main className="bg-white dark:bg-black/5 overflow-x-hidden">
            <div className="grid grid-rows-[auto_1fr_auto] min-h-screen px-6 lg:px-4 gap-4 sm:gap-12">
                <HeroSection />
            </div>

            <ComponentShowcaseCard
            className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:py-20"
            />
            <InteractivePreview/>
            <BuildInterfacesCard
            className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:py-20"
            />
          
            <TechnologyBadges/>
            {/* <EventToast /> */}
        </main>
    );
}
