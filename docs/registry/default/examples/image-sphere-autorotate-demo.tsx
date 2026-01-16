import SphereImageGrid from "@/registry/default/ui/image-sphere";

const sampleImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    alt: "User avatar 1",
    title: "Alex Johnson",
    description: "Senior Software Engineer",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    alt: "User avatar 2",
    title: "Sarah Miller",
    description: "Product Designer",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    alt: "User avatar 3",
    title: "Michael Chen",
    description: "Data Scientist",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    alt: "User avatar 4",
    title: "Emma Wilson",
    description: "UX Researcher",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    alt: "User avatar 5",
    title: "David Brown",
    description: "Frontend Developer",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    alt: "User avatar 6",
    title: "Lisa Anderson",
    description: "Marketing Lead",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    alt: "User avatar 7",
    title: "James Taylor",
    description: "DevOps Engineer",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    alt: "User avatar 8",
    title: "Olivia Davis",
    description: "Project Manager",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    alt: "User avatar 9",
    title: "Robert Martin",
    description: "Backend Developer",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    alt: "User avatar 10",
    title: "Jennifer Lee",
    description: "QA Engineer",
  },
];

export default function ImageSphereAutorotateDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <SphereImageGrid
        images={sampleImages}
        containerSize={400}
        sphereRadius={180}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </div>
  );
}
