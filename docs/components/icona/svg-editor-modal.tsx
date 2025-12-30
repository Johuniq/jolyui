"use client";

import {
  Check,
  Code2,
  Download,
  Image as ImageIcon,
  Palette,
  RefreshCw,
  RotateCw,
  Settings2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";

interface SvgEditorModalProps {
  icon: {
    name: string;
    svg: string;
    category: string;
    width: number;
    height: number;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRESET_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Green", value: "#22C55E" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
];

const PRESET_SIZES = [16, 24, 32, 48, 64, 96, 128, 256];

export function SvgEditorModal({
  icon,
  open,
  onOpenChange,
}: SvgEditorModalProps) {
  const [color, setColor] = useState("#FFFFFF");
  const [size, setSize] = useState(64);
  const [rotation, setRotation] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedPng, setCopiedPng] = useState(false);
  const [exportFormat, setExportFormat] = useState<"svg" | "png">("svg");

  // Reset state when icon changes
  useEffect(() => {
    if (icon) {
      setColor("#FFFFFF");
      setSize(64);
      setRotation(0);
      setStrokeWidth(0);
      setCopied(false);
      setCopiedPng(false);
      setExportFormat("svg");
    }
  }, [icon]);

  if (!icon) return null;

  const generateSVG = (includeStyles = true) => {
    const width = icon.width;
    const height = icon.height;

    let svgContent = icon.svg;

    // Replace currentColor and stroke with selected color
    if (includeStyles) {
      svgContent = svgContent.replace(/currentColor/g, color);
      svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${color}"`);

      // Add or replace stroke-width if specified
      if (strokeWidth > 0) {
        // Remove existing stroke-width attributes
        svgContent = svgContent.replace(/stroke-width="[^"]*"/g, "");
        // Add stroke-width to all stroke-able elements
        svgContent = svgContent.replace(
          /<path/g,
          `<path stroke-width="${strokeWidth}"`,
        );
        svgContent = svgContent.replace(
          /<circle/g,
          `<circle stroke-width="${strokeWidth}"`,
        );
        svgContent = svgContent.replace(
          /<rect/g,
          `<rect stroke-width="${strokeWidth}"`,
        );
        svgContent = svgContent.replace(
          /<line/g,
          `<line stroke-width="${strokeWidth}"`,
        );
        svgContent = svgContent.replace(
          /<polyline/g,
          `<polyline stroke-width="${strokeWidth}"`,
        );
        svgContent = svgContent.replace(
          /<polygon/g,
          `<polygon stroke-width="${strokeWidth}"`,
        );
        svgContent = svgContent.replace(
          /<ellipse/g,
          `<ellipse stroke-width="${strokeWidth}"`,
        );
      }
    }

    // Wrap content in a group with rotation
    const centerX = width / 2;
    const centerY = height / 2;

    const wrappedContent =
      rotation !== 0
        ? `<g transform="rotate(${rotation} ${centerX} ${centerY})">${svgContent}</g>`
        : svgContent;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${width} ${height}">${wrappedContent}</svg>`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateSVG());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    if (exportFormat === "svg") {
      const svg = generateSVG();
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${icon.name}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Export as PNG using data URL
      const svg = generateSVG();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = size * 2;
      canvas.height = size * 2;

      const img = new Image();

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${icon.name}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }, "image/png");
      };

      img.onerror = () => {
        console.error("Failed to convert SVG to PNG");
      };

      // Use data URL instead of blob URL for better compatibility
      const encodedSvg = encodeURIComponent(svg)
        .replace(/%20/g, " ")
        .replace(/%3D/g, "=")
        .replace(/%3A/g, ":")
        .replace(/%2F/g, "/")
        .replace(/%22/g, "'");

      img.src = `data:image/svg+xml,${encodedSvg}`;
    }
  };

  const handleCopyAsPng = async () => {
    try {
      const svg = generateSVG();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = size * 2;
      canvas.height = size * 2;

      const img = new Image();

      img.onload = async () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
            setCopiedPng(true);
            setTimeout(() => setCopiedPng(false), 2000);
          }
        }, "image/png");
      };

      img.onerror = () => {
        console.error("Failed to convert SVG to PNG");
      };

      const encodedSvg = encodeURIComponent(svg)
        .replace(/%20/g, " ")
        .replace(/%3D/g, "=")
        .replace(/%3A/g, ":")
        .replace(/%2F/g, "/")
        .replace(/%22/g, "'");

      img.src = `data:image/svg+xml,${encodedSvg}`;
    } catch (err) {
      console.error("Failed to copy as PNG:", err);
    }
  };

  const handleReset = () => {
    setColor("#FFFFFF");
    setSize(64);
    setRotation(0);
    setStrokeWidth(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[98vw] !max-w-5xl max-h-fd-container overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl">
                Icon Editor
              </DialogTitle>
              <DialogDescription className="mt-1">
                Customize and export your icon with real-time preview
              </DialogDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {icon.category}
            </Badge>
          </div>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Preview Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Live Preview</h3>
              <Badge variant="secondary" className="text-xs">
                {size}x{size}px
              </Badge>
            </div>

            <div
              className={cn(
                "relative aspect-square rounded-xl border-2 bg-background",
                "flex items-center justify-center p-12",
                "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]",
                "bg-[size:20px_20px]",
                "transition-all duration-200",
              )}
            >
              <div
                dangerouslySetInnerHTML={{ __html: generateSVG() }}
                className="transition-all duration-300 ease-out"
                style={{
                  color: color,
                  strokeWidth: strokeWidth > 0 ? strokeWidth : undefined,
                }}
              />
            </div>

            {/* Quick Export Actions */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  className="flex-1"
                  variant="outline"
                  size="lg"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Code2 className="mr-2 h-4 w-4" />
                      Copy SVG
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleCopyAsPng}
                  className="flex-1"
                  variant="outline"
                  size="lg"
                >
                  {copiedPng ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Copy PNG
                    </>
                  )}
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex flex-1 gap-2">
                  <Button
                    variant={exportFormat === "svg" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExportFormat("svg")}
                    className="flex-1"
                  >
                    SVG
                  </Button>
                  <Button
                    variant={exportFormat === "png" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExportFormat("png")}
                    className="flex-1"
                  >
                    PNG
                  </Button>
                </div>
                <Button onClick={handleDownload} className="flex-1" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download {exportFormat.toUpperCase()}
                </Button>
              </div>
            </div>

            {/* Icon Info */}
            <div className="space-y-3 rounded-xl border bg-muted/50 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{icon.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Original Size:</span>
                <span className="font-medium">
                  {icon.width}x{icon.height}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Export Size:</span>
                <span className="font-medium">
                  {size}x{size}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <Tabs defaultValue="style" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="style" className="gap-2">
                  <Palette className="h-4 w-4" />
                  Style
                </TabsTrigger>
                <TabsTrigger value="transform" className="gap-2">
                  <Settings2 className="h-4 w-4" />
                  Transform
                </TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="mt-6 space-y-6">
                {/* Color */}
                <div className="space-y-3">
                  <Label htmlFor="color" className="font-semibold text-sm">
                    Color
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-12 w-20 cursor-pointer p-1"
                    />
                    <Input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-12 flex-1 font-mono text-sm uppercase"
                      placeholder="#000000"
                    />
                  </div>

                  {/* Preset Colors */}
                  <div className="grid grid-cols-5 gap-2">
                    {PRESET_COLORS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setColor(preset.value)}
                        className={cn(
                          "h-10 rounded-lg border-2 transition-all hover:scale-105",
                          color.toUpperCase() === preset.value
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-transparent hover:border-muted-foreground/20",
                        )}
                        style={{ backgroundColor: preset.value }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="size" className="font-semibold text-sm">
                      Size
                    </Label>
                    <Badge variant="secondary">{size}px</Badge>
                  </div>
                  <Slider
                    id="size"
                    min={16}
                    max={256}
                    step={4}
                    value={[size]}
                    onValueChange={([value]) => setSize(value ?? 64)}
                    className="py-2"
                  />

                  {/* Preset Sizes */}
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_SIZES.map((presetSize) => (
                      <Button
                        key={presetSize}
                        variant={size === presetSize ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSize(presetSize)}
                      >
                        {presetSize}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Stroke Width */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stroke" className="font-semibold text-sm">
                      Stroke Width
                    </Label>
                    <Badge variant="secondary">{strokeWidth}px</Badge>
                  </div>
                  <Slider
                    id="stroke"
                    min={0}
                    max={10}
                    step={0.5}
                    value={[strokeWidth]}
                    onValueChange={([value]) => setStrokeWidth(value ?? 0)}
                    className="py-2"
                  />
                </div>
              </TabsContent>

              <TabsContent value="transform" className="mt-6 space-y-6">
                {/* Rotation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="rotation"
                      className="flex items-center gap-2 font-semibold text-sm"
                    >
                      <RotateCw className="h-4 w-4" />
                      Rotation
                    </Label>
                    <Badge variant="secondary">{rotation}°</Badge>
                  </div>
                  <Slider
                    id="rotation"
                    min={0}
                    max={360}
                    step={15}
                    value={[rotation]}
                    onValueChange={([value]) => setRotation(value ?? 0)}
                    className="py-2"
                  />
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {[0, 90, 180, 270].map((deg) => (
                      <Button
                        key={deg}
                        variant={rotation === deg ? "default" : "outline"}
                        size="sm"
                        onClick={() => setRotation(deg)}
                      >
                        {deg}°
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="h-12 w-full"
                  size="lg"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset All Settings
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
