import type { Meta, StoryObj } from '@storybook/react';
import darkTheme from '../../../../styles/darkTheme.css';
import { Form } from './Form';

const meta: Meta<typeof Form> = {
  title: 'Login/Components/Form',
  component: Form,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className={darkTheme} style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  args: {},
};
