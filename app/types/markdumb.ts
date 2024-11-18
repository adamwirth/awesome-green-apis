/**
 * Markdumb is just markdown, but with different words, and less.
 * Elements render into <p> tags of different sizes.
 * Can specify type of code to set up a <code> block instead.
 * 
 * I'm using elements of the react setup on amplify to guide the decisions here, such as "height='xxl'"
 * @link https://ui.docs.amplify.aws/react/theming/style-props
 */
export interface MarkdumbElement {
    content: string;
    size: 'xxl' | 'xl' | 'l' | 'm'
    type: 'code' | 'h1' | 'p';
}

export type MarkdumbData = MarkdumbElement[];