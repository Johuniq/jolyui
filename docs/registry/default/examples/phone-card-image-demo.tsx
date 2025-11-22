import { PhoneCard } from "@/registry/default/ui/phone-card";


export default function PhoneCardImageDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <PhoneCard
        title="Design"
        sub="Beautiful UI components for modern applications"
        tone="creative"
        gradient="from-[#1e1b4b] via-[#312e81] to-[#4c1d95]"
        imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
        mediaType="image"
      />
    </div>
  );
}
