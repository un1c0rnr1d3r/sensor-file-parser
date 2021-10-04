export enum Classification {
  Discard = 'discard',
  Keep = 'keep',
  Precise = 'precise',
  VeryPrecise = 'very precise',
  UltraPrecise = 'ultra precise',
}

export type TemperatureClassification =
  | Classification.Precise
  | Classification.VeryPrecise
  | Classification.UltraPrecise;
