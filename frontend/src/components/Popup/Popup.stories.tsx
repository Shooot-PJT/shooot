import type { Meta, StoryObj } from '@storybook/react';
import Popup from './Popup';
import Typography from '../Typography';
import Backdrop from '../Backdrop';
import darkThemeCss from '../../styles/darkTheme.css';

const meta = {
  title: 'UI/Components/Popup',
  component: Popup,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '팝업의 제목',
      type: 'string',
    },
    opacity: {
      description: '팝업 배경의 불투명도',
      type: 'number',
    },
    blur: {
      description: '팝업 배경의 흐림도',
      type: 'number',
    },
    color: {
      description: '팝업 배경의 색상',
      control: 'radio',
      options: ['100', '200', '300'],
    },
    type: {
      description: '처리 결과에 대한 타입(버튼 색상)',
      control: 'radio',
      options: ['success', 'fail'],
    },
    isClosing: {
      description: '팝업 열고 닫기',
    },
  },
} satisfies Meta<typeof Popup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className={darkThemeCss}>
        <Backdrop
          opacity={args.opacity}
          blur={args.blur}
          isClosing={args.isClosing}
        >
          <Popup
            title={args.title}
            type={args.type}
            onClose={args.onClose}
            isClosing={args.isClosing}
            color={args.color}
          >
            {args.children}
          </Popup>
        </Backdrop>
        <img src="https://cdn.pixabay.com/photo/2024/02/17/09/39/cat-8579018_1280.jpg" />
      </div>
    );
  },
  args: {
    title: '팝업',
    opacity: 40,
    blur: 40,
    color: '300',
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
    onClose: () => console.log('onClose'),
    type: 'success',
    isClosing: false,
  },
};
