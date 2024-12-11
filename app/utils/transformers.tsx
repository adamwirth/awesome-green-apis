import { ChartData } from "@/app/types/common";

type DataValue = string | number | Date;
type DataKey = string | symbol | number;
type DataItem = Record<DataKey, DataValue>;

interface AggregatedEntry {
    count: number;
    [key: string]: string | number;
}

interface AggregationAccumulator {
    [key: string]: AggregatedEntry;
}

/**
 * Gets counts of unique values for a specific key in dataset
 * 
 * TODO refactor all of these out & store static, computed versions in a cache
 * @description This typing is just saying that key is inside whatever the @param data's keys are
 * @param data Array of data items
 * @param key Key to count by
 * @returns Record of counts by value
 */
export function getCounts<T extends DataItem>(
    data: T[],
    key: keyof T
): Record<string, number> {
    return data.reduce((acc: Record<string, number>, curr) => {
        const value = curr[key];
        if (value !== undefined && value !== null) {
            const stringValue = String(value);
            acc[stringValue] = (acc[stringValue] || 0) + 1;
        }
        return acc;
    }, {});
}

/**
 * Transforms a record of counts into an array of name/value objects
 * @param counts Record of counts by key
 * @returns Array of {name, value} objects
 */
export function transformCountsToArray(
    counts: Record<string, number>
): Array<{ name: string; value: number }> {
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

/**
 * Aggregates data by year with support for multiple y-axis values
 * @param data Array of data items
 * @param chartDataRef Chart configuration
 * @returns Array of aggregated data points
 */
export function aggregateDataByYear<T extends DataItem>(
    data: T[],
    chartDataRef: ChartData<T>
): Record<string, number | string>[] {
    const { yAxis, xAxis } = chartDataRef;
    const yAxisKeys = Array.isArray(yAxis) ? yAxis : [yAxis];
    
    // Helper function to safely convert keys to strings
    const toStringKey = (key: keyof T): string => String(key);

    // 1st pass: aggregate the data
    const aggregatedData = data.reduce((acc: AggregationAccumulator, curr) => {
        const yearKey = String(curr[xAxis]);
        
        if (!acc[yearKey]) {
            acc[yearKey] = {
                [toStringKey(xAxis)]: yearKey,
                count: 0,
            };
            
            // Initialize totals for each y-axis
            yAxisKeys.forEach(key => {
                acc[yearKey][`total_${toStringKey(key)}`] = 0;
            });
        }

        // Accumulate values for each y-axis key
        yAxisKeys.forEach(key => {
            const stringKey = toStringKey(key);
            const currentValue = Number(curr[key]) || 0;
            const totalKey = `total_${stringKey}`;
            acc[yearKey][totalKey] = (Number(acc[yearKey][totalKey]) || 0) + currentValue;
        });

        acc[yearKey].count += 1;
        return acc;
    }, {});

    // 2nd pass: calculate averages
    return Object.values(aggregatedData).map((entry: AggregatedEntry) => {
        const averages: Record<string, string | number> = {
            [toStringKey(xAxis)]: entry[toStringKey(xAxis)]
        };

        yAxisKeys.forEach(key => {
            const stringKey = toStringKey(key);
            const total = Number(entry[`total_${stringKey}`]) || 0;
            averages[stringKey] = Math.round((total / entry.count) * 100) / 100;
        });

        return averages;
    });
}