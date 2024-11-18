import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';
import { TypographyColor, TypographyWeight } from './Typography.types';
import darkTheme from '../../styles/darkTheme.css';

const meta = {
  title: 'UI/Components/Typography',
  component: Typography,
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
      description: '표시할 typography',
    },
    color: {
      description: '글자 색상',
    },
    size: {
      description: '글자 크기, rem 단위',
    },
    weight: {
      description: '글자 굵기',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children: 'Typography',
    color: 'dark',
  },
};

const colors: TypographyColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'originalRed',
  'originalGreen',
  'originalBlue',
  'dark',
  'light',
  'disabled',
];
const sizes: number[] = [0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25];
const weights: TypographyWeight[] = Array.from(
  { length: 9 },
  (_, i) => ((i + 1) * 100).toString() as TypographyWeight,
);

export const Colors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color) => (
        <Typography key={color} {...args} color={color}>
          {color}
        </Typography>
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
        <Typography key={size} {...args} size={size}>
          {size}rem
        </Typography>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {weights.map((weight) => (
        <Typography key={weight} {...args} weight={weight}>
          {weight}
        </Typography>
      ))}
    </div>
  ),
};
