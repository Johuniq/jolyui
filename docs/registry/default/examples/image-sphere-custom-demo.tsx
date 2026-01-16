import SphereImageGrid from "@/registry/default/ui/image-sphere";

const techLogos = [
  {
    id: "1",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
    title: "React",
    description: "A JavaScript library for building user interfaces",
  },
  {
    id: "2",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
    title: "TypeScript",
    description: "JavaScript with syntax for types",
  },
  {
    id: "3",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
    title: "Next.js",
    description: "The React Framework for the Web",
  },
  {
    id: "4",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    alt: "Node.js",
    title: "Node.js",
    description: "JavaScript runtime built on V8",
  },
  {
    id: "5",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    alt: "Python",
    title: "Python",
    description: "A programming language that lets you work quickly",
  },
  {
    id: "6",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    alt: "Docker",
    title: "Docker",
    description: "Develop, Ship, and Run Anywhere",
  },
  {
    id: "7",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    alt: "Kubernetes",
    title: "Kubernetes",
    description: "Production-Grade Container Orchestration",
  },
  {
    id: "8",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
    title: "PostgreSQL",
    description: "The World's Most Advanced Open Source Database",
  },
];

export default function ImageSphereCustomDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <SphereImageGrid
        images={techLogos}
        containerSize={350}
        sphereRadius={150}
        dragSensitivity={0.7}
        momentumDecay={0.92}
        baseImageScale={0.15}
        hoverScale={1.3}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </div>
  );
}
