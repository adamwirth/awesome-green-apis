import { Card, ScrollView, Text, useTheme, View } from '@aws-amplify/ui-react';
import { MarkdumbData, MarkdumbElement } from '../types/markdumb';
import * as React from 'react';

interface TextPlotProps {
    data: MarkdumbData;
    options?: any;
}

/**
 * @description Uses factory methods to spool up text elements, given MarkdumbData.
 * @returns 
 */
const TextPlot = ({ data, options }: TextPlotProps) => {
    const { tokens } = useTheme();

    
    const commonTextProps = (datum: MarkdumbElement) => ({
        fontSize: tokens.fontSizes[datum.size],
        padding: `${tokens.space.small} 0`,
    });

    
    const headerBuilder = React.useCallback(
        (datum: MarkdumbElement, index: number) => (
            <Text
                key={index}
                fontWeight={tokens.fontWeights.bold}
                {...commonTextProps(datum)}
            >
                {datum.content}
            </Text>
        ),
        [tokens]
    );

    const textBuilder = React.useCallback(
        (datum: MarkdumbElement, index: number) => (
            <Text key={index} {...commonTextProps(datum)}>
                {datum.content}
            </Text>
        ),
        [tokens]
    );

    // TODO (1) look into accessibility options https://ui.docs.amplify.aws/react/components/scrollview#accessibility
    // TODO (2) bulk up default scroll bar, add a little shimmy to suggest there's a scrolling option, and add border
    const codeBuilder = React.useCallback(
        (datum: MarkdumbElement, index: number) => (
            <ScrollView
                maxWidth="100%"
                maxHeight={options?.height}
                key={index}
            >
                <Text
                    as="pre"
                    className="preformatted"
                    fontWeight={tokens.fontWeights.bold}
                    {...commonTextProps(datum)}
                >
                    {datum.content}
                </Text>
            </ScrollView>
        ),
        [tokens, options?.height]
    );

    // Map object to handle different datum types
    const builderMap: Record<string, (datum: MarkdumbElement, index: number) => JSX.Element> = {
        code: codeBuilder,
        h1: headerBuilder,
        p: textBuilder,
    };

    // Helper function to render based on type with map lookup
    const renderTextElement = React.useCallback(
        (datum: MarkdumbElement, index: number) => {
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
