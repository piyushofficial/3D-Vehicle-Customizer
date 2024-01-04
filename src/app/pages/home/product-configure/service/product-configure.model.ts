export interface ScenePosition {
  initialCarPosition: InitialCarPosition;
  initialCameraPosition: InitialCarPosition;
  carZoomDistance: carZoomDistance;
}

export interface InitialCarPosition {
  x: number;
  y: number;
  z: number;
}
export interface carZoomDistance {
  maximumDistance: number;
  minimumDistance: number;
}
export interface LightsData {
  name: string;
  position: InitialCarPosition;
}

export interface SpoilerData {
  id: number;
  name: string;
}
