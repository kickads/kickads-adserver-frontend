export interface ColorModeSlice {
  colorMode: string | null;
  setColorMode: (colorMode: string | null) => void;
}