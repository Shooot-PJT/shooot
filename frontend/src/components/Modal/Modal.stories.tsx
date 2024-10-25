import type { Meta, StoryObj } from '@storybook/react';
import Typography from '../Typography';
import Backdrop from '../Backdrop';
import darkThemeCss from '../../styles/darkTheme.css';
import Modal from './Modal';
import { Desktop } from '../Layout/Desktop';
import { Mobile } from '../Layout/Mobile';

const meta = {
  title: 'UI/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    opacity: {
      description: '모달 밖 배경의 불투명도',
      type: 'number',
    },
    blur: {
      description: '모달 배경의 흐림도',
      type: 'number',
    },
    color: {
      description: '모달 배경의 색상',
      control: 'radio',
      options: ['100', '200', '300'],
    },
    children: {
      description: '모달 내부 컨텐츠',
    },
    onClose: {
      description: '모달을 닫을때 실행될 함수',
    },
    isClosing: {
      description: '모달 열고 닫기',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div className={darkThemeCss}>
        <Desktop>
          <Backdrop
            opacity={args.opacity}
            blur={args.blur}
            isClosing={args.isClosing}
          >
            <Modal
              onClose={args.onClose}
              isClosing={args.isClosing}
              color={args.color}
            >
              {args.children}
            </Modal>
          </Backdrop>
        </Desktop>
        <Mobile>
          <Backdrop
            opacity={args.opacity}
            blur={args.blur}
            isClosing={args.isClosing}
          >
            <Modal
              onClose={args.onClose}
              isClosing={args.isClosing}
              color={args.color}
              isMobile={true}
            >
              {args.children}
            </Modal>
          </Backdrop>
        </Mobile>
        <img src="https://cdn.pixabay.com/photo/2024/02/17/09/39/cat-8579018_1280.jpg" />
      </div>
    );
  },
  args: {
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
    isClosing: false,
  },
};
