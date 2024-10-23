import type { Meta, StoryObj } from '@storybook/react';
import Backdrop from './index';
import Typography from '../Typography';
import darkTheme from '../../styles/darkTheme.css';

const meta = {
  title: 'UI/Components/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className={darkTheme}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: '표시할 내부 컨텐츠',
    },
    opacity: {
      description: '배경의 불투명도',
      type: 'number',
    },
    blur: {
      description: '배경의 흐림정도',
      type: 'number',
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isClosing: false,
    opacity: 40,
    blur: 40,
    children: (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Typography color="light" weight="500">
          컨텐츠
        </Typography>
      </div>
    ),
  },
  render: (args) => {
    document.body.style.overflow = '';
    return (
      <>
        <Backdrop
          isClosing={args.isClosing}
          opacity={args.opacity}
          blur={args.blur}
        >
          {args.children}
        </Backdrop>
        <img src="https://cdn.pixabay.com/photo/2024/02/17/09/39/cat-8579018_1280.jpg" />
      </>
    );
  },
};
