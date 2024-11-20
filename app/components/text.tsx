import { Heading, ScrollView, Text, useTheme } from '@aws-amplify/ui-react';
import * as React from 'react';

import { MarkdumbData } from '@/app/types/markdumb';

interface TextPlotProps {
    data: Readonly<MarkdumbData>;
    options?: any;
}

/**
 * @description Uses factory methods to spool up text elements, given MarkdumbData.
 * @returns 
 */
const TextPlot = ({ data, options = {} }: TextPlotProps) => {
    const { tokens } = useTheme();

    /**
     * @param {TextPlotProps['data'][number]} datum An array element out of MarkdumbData
     */
    const commonTextProps = (datum: TextPlotProps['data'][number]) => ({
        fontSize: tokens.fontSizes[datum.size],
        padding: `${tokens.space.small} 0`,
    });


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
        [tokens]
    );

    const textBuilder = React.useCallback(
        (datum: TextPlotProps['data'][number], index: number) => (
            <Text key={index} {...commonTextProps(datum)}>
                {datum.content}
            </Text>
        ),
        [tokens]
    );

    // TODO (1) look into accessibility options https://ui.docs.amplify.aws/react/components/scrollview#accessibility
    // TODO (2) bulk up default scroll bar, add a little shimmy to suggest there's a scrolling option, and add border
    const codeBuilder = React.useCallback(
        (datum: TextPlotProps['data'][number], index: number) => (
            <ScrollView
                maxWidth="100%"
                maxHeight={options.height}
                key={index}
            >
                <Text
                    as="pre"
                    className="preformatted"
                    backgroundColor={tokens.colors.background.secondary}
                    borderRadius={tokens.radii.small}
                    // Padding specified in .preformatted
                    fontSize={commonTextProps(datum).fontSize}
                >
                    {datum.content}
                </Text>
            </ScrollView>
        ),
        [tokens, options.height]
    );

    // Map object to handle different datum types
    const builderMap: Record<string, (datum: TextPlotProps['data'][number], index: number) => JSX.Element> = {
        code: codeBuilder,
        h1: headerBuilder,
        p: textBuilder,
    };

    // Helper function to render based on type with map lookup
    const renderTextElement = React.useCallback(
        (datum: TextPlotProps['data'][number], index: number) => {
            const builder = builderMap[datum.type];
            if (builder) {
                return builder(datum, index);
            }
            // Fallback if the type does not match any builder
            return (
                <Text key={index} {...commonTextProps(datum)}>
                    {datum.content}
                </Text>
            );
        },
        [builderMap]
    );

    // Guard clause for empty data
    if (!data || data.length === 0) {
        return <div>No data available to render text.</div>;
    }

    return <>{data.map(renderTextElement)}</>;
};


export default TextPlot;
