/// <reference types="vite/client" />

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';

import '../src/styles.css';
import './preview.css';

const preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      disable: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    options: {
      storySort: {
        order: [
          'Actions',
          'Forms',
          'Data Display',
          'Feedback',
          'Layout',
          'Navigation',
          'Overlays',
        ],
      },
    },
  },
} satisfies Preview;

export default preview;
