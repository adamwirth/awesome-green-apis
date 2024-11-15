export const LEFT_COLOR = "#00b300";
export const RIGHT_COLOR = "#ff6600";
const PIE_COLORS = [
        "#8884d8",
        "#FA8072",
        "#AF69EE",
        "#3DED97",
        "#3AC7EB",
        "#F9A603",
    ];
export const GET_PIE_COLOR = (index: number) => PIE_COLORS[index % PIE_COLORS.length];