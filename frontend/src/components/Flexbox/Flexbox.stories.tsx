import type { Meta, StoryObj } from '@storybook/react';
import darkTheme from '../../styles/darkTheme.css';
import Flexbox from './Flexbox';
import colorPalette from '../../styles/colorPalette';

const meta = {
  title: 'UI/Components/Flexbox',
  component: Flexbox,
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
    flexDirections: {
      description: 'flex 방향',
    },
    justifyContents: {
      description: '방향 기준 수평 정렬',
    },
    alignItems: {
      description: '방향 기준 수직 정렬',
    },
  },
} satisfies Meta<typeof Flexbox>;

export default meta;

type Story = StoryObj<typeof Flexbox>;

export const Primary: Story = {
  args: {
    flexDirections: 'row',
    justifyContents: 'between',
    alignItems: 'center',
  },
  render: (args) => (
    <Flexbox {...args}>
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '0.5rem',
          backgroundColor: colorPalette.purple['500'],
        }}
      />
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '0.5rem',
          backgroundColor: colorPalette.purple['500'],
        }}
      />
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '0.5rem',
          backgroundColor: colorPalette.purple['500'],
        }}
      />
    </Flexbox>
  ),
};
