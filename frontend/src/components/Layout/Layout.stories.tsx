import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import darkTheme from '../../styles/darkTheme.css';
import { Layout } from '.';

const meta: Meta<typeof Layout> = {
  title: 'UI/Components/Layout',
  component: Layout,
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

type Story = StoryObj<typeof Layout>;

export const Primary: Story = {
  args: {},
};
