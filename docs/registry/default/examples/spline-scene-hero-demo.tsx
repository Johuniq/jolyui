import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/registry/default/ui/spline-scene";

export default function SplineSceneHeroDemo() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="container mx-auto px-4">
        <Card className="relative h-[500px] w-full overflow-hidden border-none bg-black/[0.96]">
          <div className="flex h-full">
            {/* Left content */}
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8">
              <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text font-bold text-4xl text-white md:text-5xl">
                Results and Costs Reduced by AI
              </h1>
              <p className="mt-4 max-w-lg text-neutral-300">
                We help businesses automate workflows, build intelligent
                chatbots, and integrate AI agents that work 24/7 to boost
                productivity and drive growth.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-neutral-600 bg-transparent text-neutral-300 hover:bg-neutral-800"
                >
                  View Case Studies
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-8 text-neutral-400 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No Setup Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>30-Day ROI Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="relative flex-1">
              <SplineScene
                scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
                className="h-full w-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
