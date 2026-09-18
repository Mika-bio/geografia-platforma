import data from "./data/maps.json";

export type MapPoint = { id: string; name: string; x: number; y: number };

export type MapData = {
  kazakhstan: {
    oblasts: MapPoint[];
    rivers: MapPoint[];
    lakes: MapPoint[];
    mountains: MapPoint[];
    minerals: MapPoint[];
    zones: MapPoint[];
  };
  world: {
    countries: MapPoint[];
    mountains: MapPoint[];
    rivers: MapPoint[];
    lakes: MapPoint[];
  };
};

export const mapData = data as MapData;

export const kzLayers = [
  { key: "oblasts", label: "Облыстар" },
  { key: "rivers", label: "Өзендер" },
  { key: "lakes", label: "Көлдер" },
  { key: "mountains", label: "Таулар" },
  { key: "minerals", label: "Пайдалы қазбалар" },
  { key: "zones", label: "Табиғат зоналары" },
] as const;

export const worldLayers = [
  { key: "countries", label: "Елдер" },
  { key: "mountains", label: "Таулар" },
  { key: "rivers", label: "Өзендер" },
  { key: "lakes", label: "Көлдер" },
] as const;
