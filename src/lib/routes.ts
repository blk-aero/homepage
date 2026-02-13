export type ServiceCityPair = {
  service: string;
  city: string;
};

export type BlockedPair = {
  service: string;
  city: string;
};

export function buildServiceCityPairs(
  services: string[],
  cities: string[],
  blocked: BlockedPair[] = []
): ServiceCityPair[] {
  const blockedSet = new Set(blocked.map((entry) => `${entry.service}::${entry.city}`));

  return services.flatMap((service) =>
    cities
      .filter((city) => !blockedSet.has(`${service}::${city}`))
      .map((city) => ({ service, city }))
  );
}
