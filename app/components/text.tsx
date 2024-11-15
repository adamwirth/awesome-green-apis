import { Text, useTheme, View } from '@aws-amplify/ui-react';
import { MarkdumbData, MarkdumbElement } from '../types/markdumb';
// import { ResponsiveContainer } from 'recharts';

interface TextPlotProps {
    data: MarkdumbData;
    options?: object;
}

const TextPlot = ({ data, options }: TextPlotProps) => {
    if (!data || data.length === 0) {
        return <div>No data available to render text.</div>;
    }

    const { tokens } = useTheme();

    return (
        <>
            {data.map((datum: MarkdumbElement, index: number) => (
                <Text
                    key={index}
                    // variation="primary"
                    as={datum.code ? 'pre' : 'p'}
                    fontSize={tokens.fontSizes[datum.size]}
                    fontWeight={tokens.fontWeights.bold}
                    padding={`${tokens.space.small} 0`}
                    className={datum.code ? "preformatted" : ""}
                >
                    {datum.content}
                </Text>
            ))}
        </>
    );
}

export default TextPlot;
