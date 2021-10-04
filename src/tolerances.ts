export class Tolerances {
  static readonly CarbonMonoxideVariance = 3;
  static readonly HumidityVariance = 1;
  static readonly Temperature = {
    VeryPrecise: {
      Mean: 0.5,
      StandardDeviation: 5,
    },
    UltraPrecise: {
      Mean: 0.5,
      StandardDeviation: 3,
    },
  } as const;
}
