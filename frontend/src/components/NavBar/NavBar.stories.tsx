import type { Meta, StoryObj } from '@storybook/react';
import darkTheme from '../../styles/darkTheme.css';
import NavBar from './NavBar';
import * as style from './NavBar.css';

const meta: Meta<typeof NavBar> = {
  title: 'UI/Components/NavBar',
  component: NavBar,
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
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Primary: Story = {
  args: {},
  render: () => (
    <div style={{ width: '100%', height: '1080px' }}>
      <NavBar>
        <NavBar.Title />
        <div className={style.nav}>
          <div className={style.divi} />
          <NavBar.Menu />
        </div>
      </NavBar>
    </div>
  ),
};
