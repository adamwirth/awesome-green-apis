/**
 * Markdumb is just markdown, but with different words, and less.
 * Elements render into <p> tags of different sizes.
 * Can specify type of code to set up a <code> block instead.
 * 
 * I'm using elements of the react setup on amplify to guide the decisions here, such as "height='xxl'"
 * @link https://ui.docs.amplify.aws/react/theming/style-props
 */

interface MarkdumbElementCommon {
    type: 'code' | 'h1' | 'p' | 'badge'; // Union of all possible types
}

export type MarkdumbTextElement = MarkdumbElementCommon & {
    content: string;
    size: 'xxl' | 'xl' | 'l' | 'm';
    type: 'code' | 'h1' | 'p';
}

const enum BadgeType {
    REST = 'rest',
    GRAPHQL = 'graphql'
}
export type ValidBadgeName = `${BadgeType}`;

export type MarkdumbBadgeElement = MarkdumbElementCommon & {
    badgeName: ValidBadgeName;
    type: 'badge';
}

export type MarkdumbElement = MarkdumbTextElement | MarkdumbBadgeElement;
export type MarkdumbData = MarkdumbElement[];