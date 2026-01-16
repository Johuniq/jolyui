import SphereImageGrid from "@/registry/default/ui/image-sphere";

const sampleImages = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  src: `https://picsum.photos/seed/${i + 1}/150/150`,
  alt: `Image ${i + 1}`,
  title: `Image ${i + 1}`,
  description: `This is image number ${i + 1} in the gallery`,
}));

export default function ImageSphereLargeDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <SphereImageGrid
        images={sampleImages}
        containerSize={500}
        sphereRadius={220}
        baseImageScale={0.1}
        autoRotate={true}
        autoRotateSpeed={0.2}
      />
    </div>
  );
}
