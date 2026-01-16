import { LocationMap } from "@/registry/default/ui/expanded-map"

export default function ExpandedMapZoomDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      <div className="flex flex-col items-center gap-2">
        <LocationMap
          location="Sydney, Australia"
          latitude={-33.8688}
          longitude={151.2093}
          zoom={10}
        />
        <span className="text-xs text-muted-foreground">Zoom: 10</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LocationMap
          location="Sydney, Australia"
          latitude={-33.8688}
          longitude={151.2093}
          zoom={14}
        />
        <span className="text-xs text-muted-foreground">Zoom: 14</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LocationMap
          location="Sydney, Australia"
          latitude={-33.8688}
          longitude={151.2093}
          zoom={17}
        />
        <span className="text-xs text-muted-foreground">Zoom: 17</span>
      </div>
    </div>
  )
}
