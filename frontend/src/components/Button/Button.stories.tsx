import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import darkTheme from '../../styles/darkTheme.css';
import { ButtonColor } from './Button.types';
import Typography from '../Typography';

const meta: Meta<typeof Button> = {
  title: 'UI/Components/Button',
  component: Button,
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
      description: '버튼에 표시할 텍스트',
      control: 'text',
      defaultValue: '버튼',
    },
    color: {
      description: '버튼 색상 (primary, secondary 등)',
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'get',
        'post',
        'put',
        'patch',
        'delete',
      ],
      defaultValue: 'primary',
    },
    rounded: {
      description: '버튼의 테두리 반경 (rem 단위)',
      control: 'number',
      defaultValue: 1,
    },
    paddingX: {
      description: '버튼의 좌우 패딩 (rem 단위)',
      control: 'number',
      defaultValue: 0.5,
    },
    paddingY: {
      description: '버튼의 상하 패딩 (rem 단위)',
      control: 'number',
      defaultValue: 0.25,
    },
    fullWidth: {
      description: '버튼이 부모 너비를 꽉 채우도록 설정',
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: '기본 버튼',
    color: 'primary',
    rounded: 0.75,
    paddingX: 1.25,
    paddingY: 0.5,
    fullWidth: false,
  },
};

export const FullWidth: Story = {
  args: {
    ...Primary.args,
    fullWidth: true,
    children: '전체 너비 버튼',
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
    children: '비활성화',
  },
};

export const Colors: Story = {
  args: {
    ...Primary.args,
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {[
        'primary',
        'secondary',
        'tertiary',
        'get',
        'post',
        'put',
        'patch',
        'delete',
      ].map((color) => (
        <Button key={color} {...args} color={color as ButtonColor}>
          <Typography size={0.75}>{color} 버튼</Typography>
        </Button>
      ))}
    </div>
  ),
};
