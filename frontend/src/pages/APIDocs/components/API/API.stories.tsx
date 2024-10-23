import type { Meta, StoryObj } from '@storybook/react';
import { API } from './API';
import { TEST_RESULTS, Manager } from './API.types';
import { METHODS } from '../../types/methods';
import darkTheme from '../../../../styles/darkTheme.css';
import { DUMMY_API_HEADER_INFO_LIST } from '../../dummies/api_header_info_list';

const meta: Meta<typeof API.Header> = {
  title: 'APIDocs/Components/API',
  component: API.Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className={darkTheme} style={{ padding: '1rem', width: '95%' }}>
        <API>
          <Story />
        </API>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'API 제목',
      control: { type: 'text' },
    },
    manager: {
      description: 'API 관리자',
      control: { type: 'object' },
    },
    method: {
      description: 'HTTP 메서드',
      control: { type: 'select' },
      options: Object.values(METHODS),
    },
    needAuthorize: {
      description: '인증 필요 여부',
      control: { type: 'boolean' },
    },
    endPoint: {
      description: '엔드포인트',
      control: { type: 'text' },
    },
    lastTestResult: {
      description: '마지막 테스트 결과',
      control: { type: 'select' },
      options: Object.values(TEST_RESULTS),
    },
  },
};

export default meta;

type Story = StoryObj<typeof API.Header>;

const manager1: Manager = { id: 1, nickname: '김현진' };
const manager2: Manager = { id: 2, nickname: '장철현' };

export const Default: Story = {
  args: {
    title: '특별한 계란 목록 가져오기',
    manager: manager1,
    method: METHODS.get,
    needAuthorize: false,
    endPoint: '/api/eggs/special',
    lastTestResult: TEST_RESULTS.success,
  },
};

export const WithAuthorization: Story = {
  args: {
    title: '사용자 정보 업데이트',
    manager: manager2,
    method: METHODS.post,
    needAuthorize: true,
    endPoint: '/api/users/update',
    lastTestResult: TEST_RESULTS.fail,
  },
};

export const TestPending: Story = {
  args: {
    title: '주문 상태 변경',
    manager: manager2,
    method: METHODS.put,
    needAuthorize: true,
    endPoint: '/api/orders/status',
    lastTestResult: TEST_RESULTS.yet,
  },
};

export const MultipleHeaders: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        width: '100%',
      }}
    >
      {DUMMY_API_HEADER_INFO_LIST.map((header_info, index) => (
        <API key={index}>
          <API.Header
            title={header_info.title}
            manager={header_info.manager}
            method={header_info.method}
            needAuthorize={header_info.needAuthorize}
            endPoint={header_info.endPoint}
            lastTestResult={header_info.lastTestResult}
          />
        </API>
      ))}
    </div>
  ),
};
