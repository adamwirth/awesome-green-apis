/**
 * Markdumb is just markdown, but with different words, and less.
 * Elements render into <p> tags of different sizes.
 * Can specify type of code to set up a <code> block instead.
 * 
 * I'm using elements of the react setup on amplify to guide the decisions here, such as "height='xxl'"
 * @link https://ui.docs.amplify.aws/react/theming/style-props
 * @todo add h1 and friends
 */
export interface MarkdumbElement {
    content: string;
    size: 'xxl' | 'xl' | 'l' | 'm'
    code?: boolean;
}

export type MarkdumbData = MarkdumbElement[];