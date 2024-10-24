import type { Meta, StoryObj } from '@storybook/react';
import LockButton from './LockButton';
import darkTheme from '../../../../../../../styles/darkTheme.css';

const meta: Meta<typeof LockButton> = {
  title: 'UI/Components/API/Header/LockButton',
  component: LockButton,
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
    needAuthorize: {
      description: '권한이 필요한지 여부',
      control: 'boolean',
      defaultValue: false,
    },
    onClick: {
      description: '클릭 핸들러',
      action: 'clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LockButton>;

export const Default: Story = {
  args: {
    needAuthorize: false,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <LockButton {...args} needAuthorize={true} />
      <LockButton {...args} needAuthorize={false} />
    </div>
  ),
};
