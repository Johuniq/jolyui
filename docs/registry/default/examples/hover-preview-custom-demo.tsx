import {
  HoverPreviewLink,
  HoverPreviewProvider,
} from "@/registry/default/ui/hover-preview"

const teamData = {
  alex: {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=560&h=320&fit=crop",
    title: "Alex Johnson",
    subtitle: "CEO & Founder",
  },
  sarah: {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=560&h=320&fit=crop",
    title: "Sarah Miller",
    subtitle: "Head of Design",
  },
  michael: {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=560&h=320&fit=crop",
    title: "Michael Chen",
    subtitle: "Lead Engineer",
  },
}

export default function HoverPreviewCustomDemo() {
  return (
    <HoverPreviewProvider
      data={teamData}
      cardProps={{
        width: 350,
        borderRadius: 24,
        className: "bg-gradient-to-br from-card to-card/80",
      }}
      cursorOffset={30}
      className="p-8"
    >
      <div className="max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Meet Our Team</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Our leadership team includes{" "}
          <HoverPreviewLink previewKey="alex" className="text-blue-500 hover:text-blue-400">
            Alex Johnson
          </HoverPreviewLink>
          ,{" "}
          <HoverPreviewLink previewKey="sarah" className="text-purple-500 hover:text-purple-400">
            Sarah Miller
          </HoverPreviewLink>
          , and{" "}
          <HoverPreviewLink previewKey="michael" className="text-green-500 hover:text-green-400">
            Michael Chen
          </HoverPreviewLink>
          .
        </p>
      </div>
    </HoverPreviewProvider>
  )
}
