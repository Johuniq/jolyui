import { Magnetic } from "@/registry/default/ui/magnetic";

export default function MagneticCardsDemo() {
  const cards = [
    { title: "Design", description: "Beautiful UI components", icon: "🎨" },
    {
      title: "Development",
      description: "Clean and efficient code",
      icon: "💻",
    },
    { title: "Animation", description: "Smooth interactions", icon: "✨" },
  ];

  return (
    <div className="flex min-h-[400px] flex-wrap items-center justify-center gap-6 p-8">
      {cards.map((card, index) => (
        <Magnetic key={index} intensity={0.4} range={120}>
          <div className="flex h-48 w-56 flex-col items-center justify-center gap-3 rounded-xl border bg-card p-6 shadow-lg transition-shadow hover:shadow-xl">
            <span className="text-4xl">{card.icon}</span>
            <h3 className="font-semibold text-lg">{card.title}</h3>
            <p className="text-center text-muted-foreground text-sm">
              {card.description}
            </p>
          </div>
        </Magnetic>
      ))}
    </div>
  );
}
