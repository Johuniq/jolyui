import { LocationMap } from "@/registry/default/ui/expanded-map"

export default function ExpandedMapLocationsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      <LocationMap
        location="New York, NY"
        latitude={40.7128}
        longitude={-74.006}
      />
      <LocationMap
        location="London, UK"
        latitude={51.5074}
        longitude={-0.1278}
      />
      <LocationMap
        location="Tokyo, Japan"
        latitude={35.6762}
        longitude={139.6503}
      />
    </div>
  )
}
