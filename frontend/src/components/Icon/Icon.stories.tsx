import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import { IconColor } from './Icon.types';
import darkTheme from '../../styles/darkTheme.css';
import { HiBell } from 'react-icons/hi2';

const meta = {
  title: 'UI/Components/Icon',
  component: Icon,
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
    children: {
      description: '표시할 icon',
    },
    size: {
      description: '아이콘 크기, rem 단위',
    },
    color: {
      description: '아이콘 색상',
    },
    background: {
      description: '배경 색상, color 와 같거나 none',
    },
    rounded: {
      description: '배경 둥근 정도, rem 단위',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    children: <HiBell />,
  },
};

const colors: IconColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'dark',
  'light',
  'disabled',
];
const sizes: number[] = [0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25];
const rounds: number[] = [0, 0.25, 0.5, 0.75, 1, 999];

export const Colors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color) => (
        <Icon key={color} color={color}>
          {args.children}
        </Icon>
      ))}
    </div>
  ),
};

export const CustomBackgrounds: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color) => (
        <Icon key={color} background={color}>
          {args.children}
        </Icon>
      ))}
    </div>
  ),
};

export const NoBackgrounds: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color) => (
        <Icon key={color} color={color} background="none">
          {args.children}
        </Icon>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {sizes.map((size) => (
        <Icon key={size} size={size}>
          {args.children}
        </Icon>
      ))}
    </div>
  ),
};

export const Rounds: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {rounds.map((rounded) => (
        <Icon key={rounded} rounded={rounded}>
          {args.children}
        </Icon>
      ))}
    </div>
  ),
};
