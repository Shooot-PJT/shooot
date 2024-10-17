import React from 'react';
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
    flexDirection: {
      description: 'flex 방향',
    },
    justifyContent: {
      description: '방향 기준 수평 정렬',
    },
    alignItems: {
      description: '방향 기준 수직 정렬',
    },
    flexWrap: {
      description: '줄넘김 여부',
    },
    rowGap: {
      description: '행 간격',
    },
    columnGap: {
      description: '열 간격',
    },
    borderRadius: {
      description: '모서리 둥근 정도',
    },
    paddingTop: {
      description: '상단 padding',
    },
    paddingBottom: {
      description: '하단 padding',
    },
    paddingLeft: {
      description: '좌측 padding',
    },
    paddingRight: {
      description: '우측 padding',
    },
    marginTop: {
      description: '상단 margin',
    },
    marginBottom: {
      description: '하단 margin',
    },
    marginLeft: {
      description: '좌측 margin',
    },
    marginRight: {
      description: '우측 margin',
    },
    bg: {
      description: '배경색',
    },
  },
} satisfies Meta<typeof Flexbox>;

export default meta;

type Story = StoryObj<typeof Flexbox>;

export const Primary: Story = {
  args: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    rowGap: '0rem',
    columnGap: '0rem',
    borderRadius: '0.5rem',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    marginTop: '2rem',
    marginBottom: '2rem',
    marginLeft: '2rem',
    marginRight: '2rem',
    bg: 100,
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
