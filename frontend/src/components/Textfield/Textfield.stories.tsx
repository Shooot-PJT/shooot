import type { Meta, StoryObj } from '@storybook/react';
import theme from '../../styles/theme.css';
import Textfield from './Textfield';
import { useRef } from 'react';
import darkThemeCss from '../../styles/darkTheme.css';
import Flexbox from '../Flexbox';

const meta = {
  title: 'UI/Components/Textfield',
  component: Textfield,
  decorators: [
    (Story) => (
      <div
        className={darkThemeCss}
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#3A3A4A',
          padding: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '텍스트필드의 라벨',
      type: 'string',
    },
    color: {
      description: '텍스트필드의 active border 컬러와 라벨 컬러',
      control: 'select',
      type: 'string',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'grey',
        'get',
        'post',
        'put',
        'delete',
      ],
    },
    labelSize: {
      description: '라벨의 폰트사이즈 (rem단위)',
      type: 'number',
    },
    coloredLabel: {
      description: '라벨에 색상을 적용할지',
      type: 'boolean',
    },
    size: {
      description:
        'textfield의 사이즈와 입력값의 폰트 사이즈 (가로는 ratio 비례 rem, 폰트는 size당 2px씩) ',
    },
    ratio: {
      description: 'textfield의 가로/세로 길이 비율',
      type: 'number',
    },
    fullWidth: {
      description: '부모요소에 100%로 맞출지',
      type: 'boolean',
    },
    placeholder: {
      description: '입력값에 대한 설명',
    },
  },
} satisfies Meta<typeof Textfield>;

export default meta;

type Story = StoryObj<typeof meta>;

const ParentComponent = (args) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div>
        <Textfield
          ref={inputRef}
          label={args.label}
          labelSize={args.labelSize}
          color={args.color}
          fullWidth={args.fullWidth}
          coloredLabel={args.coloredLabel}
          size={args.size}
          ratio={args.ratio}
          placeholder={args.placeholder}
        />
      </div>
    </>
  );
};

export const Primary: Story = {
  args: {
    label: '라벨',
    labelSize: 1,
    color: 'primary',
    size: 2,
    ratio: 6,
    fullWidth: false,
    coloredLabel: true,
    placeholder: '입력하세요',
  },
  render: (args) => <ParentComponent {...args} />,
};

export const Color: Story = {
  args: {
    label: '라벨',
    labelSize: 1,
    color: 'primary',
    size: 2,
    ratio: 6,
    fullWidth: false,
    coloredLabel: true,
    placeholder: '입력하세요',
  },
  render: (args) => {
    return (
      <Flexbox flexDirection="column" columnGap={1}>
        {Object.keys(theme.color.textfield).map((color, index) => {
          if (
            [
              'primary',
              'secondary',
              'tertiary',
              'grey',
              'get',
              'post',
              'put',
              'delete',
            ].includes(color)
          ) {
            return <ParentComponent key={index} {...args} color={color} />;
          }
          return null;
        })}
      </Flexbox>
    );
  },
};
