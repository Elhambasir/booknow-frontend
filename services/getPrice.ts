import { calculateFare } from "./fareCalculator";

export const getPrice = (
  type: "one way" | "return",
  price_options: any,
  distance: number,
  duration: number,
  options?: { meet_greet?: number; child_seat?: number; airport_fee?: number }
) => {
  if (!distance || !duration) {
    console.log("Invalid distance or duration for fare calculation");
    return;
  }

  try {
    const { baseFare, perMin, commission, distanceBands } = price_options;

    const calculatedPrices = calculateFare({
      distanceInMiles: distance,
      estimatedTimeInMinutes: duration,
      distanceBands,
      baseFare,
      perMinuteRate: perMin,
      bookingFee: commission,
    });

    const meet_greet = type === "one way" ? options?.meet_greet ?? 0 : 0;
    const child_seat = options?.child_seat ?? 0;
    const airport_fee = options?.airport_fee ?? 0;

    const additions_total = meet_greet + child_seat + airport_fee;
    let from_amount = calculatedPrices.totalFare + additions_total;
    let return_amount = 0;
    if (type === "return") return_amount = from_amount;
    const total = from_amount + return_amount;
    const vatRate = 0.2;
    const subtotal = total / (1 + vatRate);
    const tax = total - subtotal;
    return {
      total,
      from_amount,
      return_amount,
      meet_greet,
      child_seat,
      subtotal,
      tax,
      airport_fee,
      type,
    };
  } catch (error) {
    console.error("Error calculating fare:", error);
    return;
  }
};
