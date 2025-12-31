import { useEffect, useState } from "react";

export interface IconData {
  body: string;
  width?: number;
  height?: number;
}

interface IconSet {
  prefix: string;
  info: {
    name: string;
    total: number;
    author?: {
      name: string;
      url: string;
    };
    license?: {
      title: string;
      spdx: string;
      url: string;
    };
    samples?: string[];
    category?: string;
    tags?: string[];
    palette?: boolean;
    height?: number;
    displayHeight?: number;
  };
  lastModified: number;
  icons: Record<string, IconData>;
  width?: number;
  height?: number;
}

export function useIconLibrary(category: string) {
  const [icons, setIcons] = useState<Record<string, IconData> | null>(null);
  const [info, setInfo] = useState<IconSet["info"] | null>(null);
  const [defaultDimensions, setDefaultDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 1000, height: 1000 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchIcons() {
      if (!category) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/icons/${category}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch icons: ${response.statusText}`);
        }

        const data: IconSet = await response.json();

        if (isMounted) {
          setIcons(data.icons);
          setInfo(data.info);
          // Set default dimensions from the icon set
          // Priority: root level width/height > info.height > default 16x16 (most icons are square)
          const width =
            data.width || data.info?.height || data.info?.displayHeight || 16;
          const height =
            data.height || data.info?.height || data.info?.displayHeight || 16;

          setDefaultDimensions({
            width,
            height,
          });
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load icons");
          setLoading(false);
        }
      }
    }

    fetchIcons();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { icons, info, defaultDimensions, loading, error };
}
