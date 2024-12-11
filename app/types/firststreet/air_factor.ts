export type FactorScale = "Minimal" // 1
    | "Minor" // 2
    | "Moderate" // 3, 4
    | "Major" // 5, 6
    | "Severe" // 7, 8
    | "Extreme"; // 9, 10

export const FactorScaleMap: Record<FactorScale, number[]> = {
    Minimal: [1],
    Minor: [2],
    Moderate: [3, 4],
    Major: [5, 6],
    Severe: [7, 8],
    Extreme: [9, 10],
};


export interface AirFactor {
    /**
     * @param {fsid} - Unique identifier assigned to each location, scoped to its location type.
     * - Example: `fsid: 50` for a "property" is unique within properties.
     * - Cross-location types, `fsid` may collide (e.g., `fsid: 50` for a property and a state).
     * @ref https://docs.firststreet.org/api/graphql-api/data-notes
     */
    fsid: number;
    airFactor: number;
    factorScale: FactorScale;
}
