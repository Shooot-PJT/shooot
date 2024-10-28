import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import darkTheme from '../../styles/darkTheme.css';
import { Banner } from '.';

const meta: Meta<typeof Banner> = {
  title: 'UI/Components/Banner',
  component: Banner,
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

type Story = StoryObj<typeof Banner>;

export const Primary: Story = {
  args: {},
};
