import type { Meta, StoryObj } from '@storybook/react';

import Textfield from './Textfield';
import { useRef } from 'react';
import darkThemeCss from '../../styles/darkTheme.css';

const meta = {
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
  argTypes: {
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary', 'grey'],
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

export const Default: Story = {
  args: {
    label: '라벨',
    labelSize: 1,
    color: 'primary',
    size: 1,
    ratio: 6,
    fullWidth: false,
    coloredLabel: true,
    placeholder: '입력하세요',
  },
  render: (args) => <ParentComponent {...args} />,
};
