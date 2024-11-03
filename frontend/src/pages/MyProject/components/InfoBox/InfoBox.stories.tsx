import type { Meta, StoryObj } from '@storybook/react';
import darkTheme from '../../../../styles/darkTheme.css';
import { InfoBox } from './InfoBox';

const meta: Meta<typeof InfoBox> = {
  title: 'MyProject/Components/InfoBox',
  component: InfoBox,
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
    type: {
      description: '종류 선택',
    },
    info: {
      description: 'type 이 info 일 때 보여줄 정보',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfoBox>;

export const Primary: Story = {
  args: {
    type: 'add',
    info: {
      projectId: 1,
      name: '프로젝트1',
      englishName: 'project1',
      logoImageUrl: '/assets/sample.png',
      memo: '프로젝트1의 메모입니다',
      userCount: 1,
      isOwner: true,
    },
  },
  render: (args) => (
    <>
      <div style={{ display: 'flex', columnGap: '1rem' }}>
        <InfoBox {...args} type="add" />
        <InfoBox {...args} type="info" />
      </div>
    </>
  ),
};
