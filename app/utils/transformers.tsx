import { ChartData } from "../types/common";

type DataItem = Record<string | symbol | number, any>;
interface AggregatedEntry {
    [key: string]: string | number;
    count: number;
}

interface AggregationAccumulator {
    [year: string]: AggregatedEntry;
}
/*
* TODO refactor all of these out & store static, computed versions in a cache
*/
/** @description This typing is just saying that key is inside whatever the @param data's keys are */
export const getCounts = <T extends keyof DataItem>(data: DataItem[], key: T): Record<string, number> => {
    return data.reduce((acc: Record<string, number>, curr) => {
        const value = curr[key];
        if (value) {
            acc[value] = (acc[value] || 0) + 1;
        }
        return acc;
    }, {});
};

// Transform map object to array
export const transformCountsToArray = (counts: Record<string, number>) => {
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

export const aggregateDataByYear = (data: DataItem[], chartDataRef: ChartData) => {
    const { yAxis, xAxis } = chartDataRef;
    const yAxisKeys = Array.isArray(yAxis) ? yAxis : [yAxis];

    // First, ensure we convert any Date objects or complex types to strings for the xAxis
    const aggregatedData = data.reduce((acc: AggregationAccumulator, curr) => {
        // Convert the year value to a string if it's not already
        const year = String(curr[xAxis]);

        if (!acc[year]) {
            // Initialize entry for each year
            acc[year] = {
                [xAxis]: year,
                count: 0,
            };
            // Initialize totals accumulators for each yAxis key
            yAxisKeys.forEach((key: string) => {
                acc[year][`total_${key}`] = 0;
            });
        }

        // Accumulate values for each yAxis key, ensuring numeric conversion
        yAxisKeys.forEach(key => {
            const currentValue = Number(curr[key]) || 0;
            const existingTotal = Number(acc[year][`total_${key}`]) || 0;
            acc[year][`total_${key}`] = existingTotal + currentValue;
        });

        acc[year].count += 1;
        return acc;
    }, {});

    // Calculate averages for each yAxis key
    return Object.values(aggregatedData).map((entry: AggregatedEntry) => {
        const averages: Record<string, string | number> = {
            [xAxis]: entry[xAxis] // Keep the original xAxis value as is
        };

        yAxisKeys.forEach(key => {
            const total = Number(entry[`total_${key}`]) || 0;
            averages[key] = Math.round((total / entry.count) * 100) / 100;
        });

        return averages;
    });
};