import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';
import darkTheme from '../../styles/darkTheme.css';
import { ProgressColor } from './Progress.types';

const meta = {
  title: 'UI/Components/Progress',
  component: Progress,
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
  argTypes: {
    height: {
      description: '높이, rem 단위',
    },
    color: {
      description: 'bar 색상',
    },
    bg: {
      description: '배경 색상',
    },
    percent: {
      description: 'bar 길이, 퍼센트 단위',
    },
    rounded: {
      description: '배경 둥근 정도, rem 단위',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof Progress>;

export const Primary: Story = {
  args: {
    height: 0.5,
    color: 'primary',
    bg: '100',
    percent: 50,
    rounded: 999,
  },
};

const colors: ProgressColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'get',
  'post',
  'put',
  'patch',
  'delete',
];
const percents: number[] = [0, 25, 50, 75, 100];

export const Colors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {colors.map((color) => (
        <Progress key={color} {...args} color={color} />
      ))}
    </div>
  ),
};

export const Percents: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {percents.map((percent) => (
        <Progress key={percent} {...args} percent={percent} />
      ))}
    </div>
  ),
};
