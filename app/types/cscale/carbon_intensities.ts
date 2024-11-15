/**
 * Represents a request for carbon intensity data.
 * @link https://api.cscale.io/api/cscale-swagger-docs#/
 */
export interface CarbonIntensitiesRequest {
    /**
     * Region within which to search for location. 
     * USA and Canada can use postal codes for location. 
     * Global locations use lat/long.
     */
    location: RequestLatLong | PostalCode;

    /**
     * Region for the carbon intensity data search.
     * "USA"/"Canada" use postal codes, "global" uses lat/long.
     * Default is "USA".
     */
    region?: "Canada" | "USA" | "global";

    /**
     * Unit system to use for the response.
     * Default is "Imperial".
     */
    unit_system?: "Imperial" | "SI" | "Metric";

    /**
     * Object to filter data for specific carbon intensity values.
     * Modifies what the response will be shaped like.
     */
    filterby?: FilterBy;
}

export interface RequestLatLong {
    /**
     * Latitude of the location. Must be between -90 and 90.
     */
    latitude: number; // [-90, 90]
    /**
 * Longitude of the location. Must be between -180 and 180.
 */
    longitude: number; // [-180, 180]
}

/**
 * Represent a US/Canada zipcode.
 * @example 40002
 * @description 
 * Having too much fun with this!
 * Definitely don't need to have any validation. Might dumb this back down to a string if the typescript engine starts thinking too much.
 */
export type PostalCode = `${number}${number}${number}${number}${number}` | `${number}${number}${number}${number}${number}-${string}`;

/**
 * Filter options for carbon intensity data.
 */
export interface FilterBy {
    /**
     * Filter for cladding data.
     * Default is "cladding_assembly".
     */
    cladding?: "cladding_assembly" | null;

    /**
     * Filter for glazing data.
     * Default is "frame".
     */
    glazing?: "frame" | null;
}

/**
 * Represents the response object for carbon intensity data.
 * @link https://api.cscale.io/api/cscale-swagger-docs#/
 */
export interface CarbonIntensitiesResponse {
    /**
     * Carbon intensity of envelope (cladding, glazing, and roofing).
     */
    envelope: Envelope;

    /**
     * Carbon intensity of the building's structure (superstructure and foundations).
     */
    structure: Structure;

    /**
     * Carbon intensity of interior fitout in kgCO2e per unit area.
     */
    interior_fitout: Record<string, unknown>;

    /**
     * Carbon intensity of MEP in kgCO2e per unit area.
     */
    mep: Record<string, unknown>;

    /**
     * Carbon intensity of hardscape in kgCO2e per unit area.
     */
    hardscape: Record<string, unknown>;

    /**
     * Carbon intensity of on-site solar array in kgCO2e per unit area.
     */
    pv_array: Record<string, unknown>;
}

/**
 * Carbon intensity of envelope components.
 * @todo schemas undefined currently beyond just "object"
 */
export interface Envelope {
    /**
     * Area-weighted average carbon intensity of opaque envelope.
     * TODO not sure how to represent the ambiguous "additional properties object" in the docs: it could be saying they're nested to an arbitrary depth, or that it is nested once
     */
    cladding: Record<string, unknown>;

    /**
     * Area-weighted average carbon intensity of transparent envelope.
     */
    glazing: Record<string, unknown>;

    /**
     * Carbon intensity of roofing assembly.
     */
    roofing: Record<string, unknown>;
}

/**
 * Carbon intensity of various structure components.
 */
export interface Structure {
    /**
     * Carbon intensity of CMU/tar structure.
     */
    CMUTar: Record<string, unknown>;

    /**
     * Carbon intensity of CMU/block structure.
     */
    CMUBlock: Record<string, unknown>;

    /**
     * Carbon intensity of concrete with 4ksi strength.
     */
    Conc3_4K6ST: Record<string, unknown>;

    /**
     * Carbon intensity of concrete with 6ksi strength.
     */
    Conc5_6K6ST: Record<string, unknown>;

    /**
     * Carbon intensity of concrete with 7ksi strength.
     */
    Conc7_16K6ST: Record<string, unknown>;

    /**
     * Carbon intensity of reinforced concrete.
     */
    ReinforcignBar: Record<string, unknown>;

    /**
     * Carbon intensity of steel structure.
     */
    SteelStruct: Record<string, unknown>;

    /**
     * Carbon intensity of steel deck structure.
     */
    SteelDeck: Record<string, unknown>;

    /**
     * Carbon intensity of wood structure.
     */
    woodLumber: Record<string, unknown>;

    /**
     * Carbon intensity of wood products (plywood).
     */
    woodPly: Record<string, unknown>;

    /**
     * Carbon intensity of mass timber structure.
     */
    woodMassTimber: Record<string, unknown>;
}

