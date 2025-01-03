import * as React from 'react';
import { MarkdumbData } from '@/app/types/markdumb';
import { Badge, Heading, ScrollView, Text, useTheme } from '@aws-amplify/ui-react';

const badgeMap = Object.freeze({
    'rest': {
        'className': 'badge--rest',
        'content': 'REST'
    },
    'graphql': {
        'className': 'badge--graphql',
        'content': 'GraphQL'
    }
} as const);

interface TextPlotProps {
    data: Readonly<MarkdumbData>;
    options: {
        height: string;
    };
}

const TextPlot = ({ data, options }: TextPlotProps) => {
    const { tokens } = useTheme();

    const getTextProps = React.useCallback((element: { size: string }) => ({
        fontSize: tokens.fontSizes[element.size],
        padding: `${tokens.space.small} 0`,
    }), [tokens.fontSizes, tokens.space.small]);

    const builders = React.useMemo(() => ({
        h1: (element: { type: 'h1', content: string, size: string }, index: number) => (
            <Heading
                key={index}
                fontWeight={tokens.fontWeights.bold}
                style={{ 'display': 'inline' }}
                {...getTextProps(element)}
            >
                {element.content}
            </Heading>
        ),

        p: (element: { type: 'p', content: string, size: string }, index: number) => (
            <Text key={index} {...getTextProps(element)}>
                {element.content}
            </Text>
        ),

        code: (element: { type: 'code', content: string, size: string }, index: number) => (
            <ScrollView maxWidth="100%" maxHeight={options.height} key={index}>
                <Text
                    as="pre"
                    backgroundColor={tokens.colors.background.secondary}
                    borderRadius={tokens.radii.small}
                    fontSize={getTextProps(element).fontSize}
                >
                    {element.content}
                </Text>
            </ScrollView>
        ),

        badge: (element: { type: 'badge', badgeName: keyof typeof badgeMap }, index: number) => {
            const badge = badgeMap[element.badgeName];
            return (
                <Badge
                    key={index}
                    className={'badge--api-type ' + badge.className}>
                    {badge.content}
                </Badge>
            );
        }
    }), [tokens, options.height, getTextProps]);

    const renderElement = React.useCallback(
        (element: MarkdumbData[number], index: number) => {
            const builder = builders[element.type];
            if (builder) {
                return builder(element as any, index);
            }
            if ('content' in element) {
                return (
                    <Text key={index} {...getTextProps(element)}>
                        {element.content}
                    </Text>
                );
            }
            return null;
        },
        [builders, getTextProps]
    );

    if (!data.length) return <div>No data available to render text.</div>;

    return <>{data.map(renderElement)}</>;
};

export default TextPlot;