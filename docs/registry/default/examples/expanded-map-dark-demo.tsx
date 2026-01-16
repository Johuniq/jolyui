import { LocationMap } from "@/registry/default/ui/expanded-map"

export default function ExpandedMapDarkDemo() {
  return (
    <div className="flex items-center justify-center p-12">
      <LocationMap
        location="Paris, France"
        latitude={48.8566}
        longitude={2.3522}
        tileProvider="carto-dark"
      />
    </div>
  )
}
