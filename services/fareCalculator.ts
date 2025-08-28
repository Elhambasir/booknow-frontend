export interface FareBreakdown {
  distance: number; // in miles
  estimatedTime: number; // in minutes
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  bookingFee: number;
  surgePricing: number;
  totalFare: number;
  pricePerMile: number;
}

type DistanceBand = {
  limit: number; // cumulative distance limit in miles
  rate: number; // price per mile for this band
};

type FareCalculationParams = {
  distanceInMiles: number;
  estimatedTimeInMinutes: number;
  distanceBands: DistanceBand[]; // now required
  baseFare: number;
  perMinuteRate: number;
  commission: number;
  surgeMultiplier?: number;
};

export const calculateFare = (params: FareCalculationParams): FareBreakdown => {
  const {
    distanceInMiles,
    estimatedTimeInMinutes,
    distanceBands,
    baseFare,
    perMinuteRate,
    commission,
    surgeMultiplier = 1.0,
  } = params;

  let distanceFare = 0;
  let remainingDistance = distanceInMiles;
  let previousLimit = 0;

  for (const band of distanceBands) {
    const bandDistance = Math.min(
      remainingDistance,
      band.limit - previousLimit
    );
    if (bandDistance <= 0) break;

    distanceFare += bandDistance * band.rate;
    remainingDistance -= bandDistance;
    previousLimit = band.limit;

    if (remainingDistance <= 0) break;
  }

  const timeFare = estimatedTimeInMinutes * perMinuteRate;
  const subtotal = baseFare + distanceFare + timeFare;
  const surgePricing = subtotal * (surgeMultiplier - 1);
  const total = subtotal  + surgePricing;
  const bookingFee = total * commission;
  const totalFare = bookingFee + total;
  const pricePerMile =
    distanceInMiles > 0
      ? distanceFare / distanceInMiles
      : distanceBands[0]?.rate ?? 0;

  return {
    distance: Math.round(distanceInMiles * 100) / 100,
    estimatedTime: Math.round(estimatedTimeInMinutes),
    baseFare: Math.round(baseFare * 100) / 100,
    distanceFare: Math.round(distanceFare * 100) / 100,
    timeFare: Math.round(timeFare * 100) / 100,
    bookingFee: Math.round(bookingFee * 100) / 100,
    surgePricing: Math.round(surgePricing * 100) / 100,
    totalFare: Math.round(totalFare * 100) / 100,
    pricePerMile: Math.round(pricePerMile * 100) / 100,
  };
};
