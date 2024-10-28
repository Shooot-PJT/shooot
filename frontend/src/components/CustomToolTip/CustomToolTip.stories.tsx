import type { Meta, StoryObj } from '@storybook/react';
import { CustomTooltip } from './index';
import darkTheme from '../../styles/darkTheme.css';

const meta: Meta<typeof CustomTooltip> = {
  title: 'UI/Components/CustomTooltip',
  component: CustomTooltip,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        className={darkTheme}
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '툴팁에 표시할 내용',
      control: 'text',
      defaultValue: 'Tooltip text',
    },
    placement: {
      description: '툴팁이 표시될 위치',
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      defaultValue: 'top',
    },
    arrow: {
      description: '툴팁에 화살표 표시 여부',
      control: 'boolean',
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof CustomTooltip>;

export const Default: Story = {
  args: {
    title: 'Default Tooltip',
    placement: 'top',
    arrow: true,
  },
  render: (args) => (
    <CustomTooltip {...args}>
      <span style={{ cursor: 'pointer' }}>Hover해봐요</span>
    </CustomTooltip>
  ),
};

export const PlacementVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      <CustomTooltip title="Top" placement="top">
        <span style={{ cursor: 'pointer' }}>Top Tooltip</span>
      </CustomTooltip>
      <CustomTooltip title="Bottom" placement="bottom">
        <span style={{ cursor: 'pointer' }}>Bottom Tooltip</span>
      </CustomTooltip>
      <CustomTooltip title="Left" placement="left">
        <span style={{ cursor: 'pointer' }}>Left Tooltip</span>
      </CustomTooltip>
      <CustomTooltip title="Right" placement="right">
        <span style={{ cursor: 'pointer' }}>Right Tooltip</span>
      </CustomTooltip>
    </div>
  ),
};
