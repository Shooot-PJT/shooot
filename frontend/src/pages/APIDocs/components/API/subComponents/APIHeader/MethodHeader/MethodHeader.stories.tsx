import type { Meta, StoryObj } from '@storybook/react';
import MethodHeader from './MethodHeader';
import darkTheme from '../../../../../../../styles/darkTheme.css';

const meta: Meta<typeof MethodHeader> = {
  title: 'UI/Components/API/Header/MethodHeader',
  component: MethodHeader,
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
    method: {
      description:
        'HTTP 메서드에 따라 API헤더 컴포넌트의 메서드 헤더를 설정합니다.',
      control: 'select',
      options: ['get', 'post', 'put', 'patch', 'delete'],
      defaultValue: 'get',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MethodHeader>;

export const Default: Story = {
  args: {
    method: 'get',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MethodHeader method="get" />
      <MethodHeader method="post" />
      <MethodHeader method="put" />
      <MethodHeader method="patch" />
      <MethodHeader method="delete" />
    </div>
  ),
};
