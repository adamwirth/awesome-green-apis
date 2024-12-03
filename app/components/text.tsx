import { MarkdumbData } from '@/app/types/markdumb';
import { Heading, ScrollView, Text, useTheme } from '@aws-amplify/ui-react';
import * as React from 'react';

interface TextPlotOptions {
    height: string;
}

interface TextPlotProps {
    data: Readonly<MarkdumbData>;
    options: TextPlotOptions;
}

/**
 * @description Uses factory methods to spool up text elements, given MarkdumbData.
 */
const TextPlot = ({ data, options }: TextPlotProps) => {
    const { tokens } = useTheme();

    /**
     * @param {TextPlotProps['data'][number]} datum An array element out of MarkdumbData
     */
    const commonTextProps = React.useCallback((datum: TextPlotProps['data'][number]) => ({
        fontSize: tokens.fontSizes[datum.size],
        padding: `${tokens.space.small} 0`,
    }), [tokens.fontSizes, tokens.space.small]);

    const headerBuilder = React.useCallback(
        (datum: TextPlotProps['data'][number], index: number) => (
            <Heading
                key={index}
                fontWeight={tokens.fontWeights.bold}
                {...commonTextProps(datum)}
            >
                {datum.content}
            </Heading>
        ),
        [tokens.fontWeights.bold, commonTextProps]
    );

    const textBuilder = React.useCallback(
        (datum: TextPlotProps['data'][number], index: number) => (
            <Text key={index} {...commonTextProps(datum)}>
                {datum.content}
            </Text>
        ),
        [commonTextProps]
    );

    const codeBuilder = React.useCallback(
        (datum: TextPlotProps['data'][number], index: number) => (
            <ScrollView
                maxWidth="100%"
                maxHeight={options.height}
                key={index}
            >
                <Text
                    as="pre"
                    backgroundColor={tokens.colors.background.secondary}
                    borderRadius={tokens.radii.small}
                    fontSize={commonTextProps(datum).fontSize}
                >
                    {datum.content}
                </Text>
            </ScrollView>
        ),
        [tokens.colors.background.secondary, tokens.radii.small, options.height, commonTextProps]
    );

    const builderMap = React.useMemo(() => ({
        code: codeBuilder,
        h1: headerBuilder,
        p: textBuilder,
    }), [codeBuilder, headerBuilder, textBuilder]);

    const renderTextElement = React.useCallback(
        (datum: TextPlotProps['data'][number], index: number) => {
            const builder = builderMap[datum.type];
            if (builder) {
                return builder(datum, index);
            }
            return (
                <Text key={index} {...commonTextProps(datum)}>
                    {datum.content}
                </Text>
            );
        },
        [builderMap, commonTextProps]
    );

    if (data.length === 0) {
        return <div>No data available to render text.</div>;
    }

    return <>{data.map(renderTextElement)}</>;
};

export default TextPlot;