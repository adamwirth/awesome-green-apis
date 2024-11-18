export const getCounts = (data: any[], key: string | symbol | number): Record<string, number> => {
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


// Helper function to aggregate data by year + calculate averages for multiple keys
export const aggregateDataByYear = (data: any[], xAxisKey: string, yAxis: string | string[]) => {
    const yAxisKeys = typeof yAxis === 'object' ? yAxis : [yAxis];
    const aggregatedData = data.reduce((acc, curr) => {
        const year = curr[xAxisKey];
        if (!acc[year]) {
            // Initialize entry for each year
            acc[year] = {
                [xAxisKey]: year,
                count: 0,
            };
            // Initialize totals accumulators for each yAxis key
            yAxisKeys.forEach((key: string) => {
                acc[year][`total_${key}`] = 0;
            });
        }

        // Accumulate values for each yAxis key
        yAxisKeys.forEach(key => {
            acc[year][`total_${key}`] += curr[key];
        });
        // Store counts to do statistics later
        acc[year].count += 1;

        return acc;
    }, {});

    // Calculate averages for each yAxis key
    return Object.values(aggregatedData).map((entry: any) => {
        const averages: Record<string, number> = { [xAxisKey]: entry[xAxisKey] };
        // Doing statistics here
        // todo add others here as needed
        yAxisKeys.forEach(key => {
            averages[`average_${key}`] = Math.round((entry[`total_${key}`] / entry.count) * 100) / 100;
        });
        return averages;
    });
};