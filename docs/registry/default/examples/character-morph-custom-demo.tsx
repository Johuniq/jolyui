"use client";

import { CharacterMorph } from "@/registry/default/ui/character-morph";

export default function CharacterMorphCustomDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Fast Morph</h3>
        <CharacterMorph
          texts={["Code", "Hack", "Debug", "Fix"]}
          interval={2000}
          staggerDelay={0.02}
          charDuration={0.3}
          className="font-mono text-2xl text-primary"
        />
      </div>

      <div className="text-center">
        <h3 className="mb-4 font-semibold text-lg">Slow Morph</h3>
        <CharacterMorph
          texts={["Design", "Create", "Build", "Deploy"]}
          interval={4000}
          staggerDelay={0.05}
          charDuration={0.8}
          className="font-bold text-3xl text-destructive"
        />
      </div>
    </div>
  );
}
