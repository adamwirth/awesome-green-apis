export const LEFT_COLOR = "#FFCF96"; // rosy
export const RIGHT_COLOR = "#B5DEFF"; // soft blue
const PIE_COLORS = [
        "#8884d8",
        "#FA8072",
        "#AF69EE",
        "#3DED97",
        "#3AC7EB",
        "#F9A603",
    ];
export const GET_PIE_COLOR = (index: number) => PIE_COLORS[index % PIE_COLORS.length];