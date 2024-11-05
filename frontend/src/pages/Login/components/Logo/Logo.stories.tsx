import type { Meta, StoryObj } from '@storybook/react';
import darkTheme from '../../../../styles/darkTheme.css';
import { Logo } from './Logo';
import theme from '../../../../styles/theme.css';

const meta: Meta<typeof Logo> = {
  title: 'Login/Components/Logo',
  component: Logo,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        className={darkTheme}
        style={{
          padding: '1rem',
          backgroundColor: theme.color.background['200'],
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Primary: Story = {
  args: {},
};
