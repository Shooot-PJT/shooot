import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CustomTabs, CustomTab, CustomTabsProps } from './CustomTabs';
import { Box } from '@mui/material';

const meta: Meta<typeof CustomTabs> = {
  title: 'UI/Components/CustomTabs',
  component: CustomTabs,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '현재 선택된 탭의 인덱스',
      control: { type: 'number', min: 0, max: 2 },
      defaultValue: 0,
    },
    onChange: {
      description: '탭이 변경될 때 호출되는 핸들러',
      action: 'changed',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CustomTabs>;

const Template = (args: CustomTabsProps) => {
  const [value, setValue] = React.useState(args.value);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    args.onChange(event, newValue);
  };

  return (
    <Box sx={{ bgcolor: '#2e1534', width: '100%' }}>
      <CustomTabs value={value} onChange={handleChange}>
        <CustomTab label="Params" />
        <CustomTab label="Path Variables" />
        <CustomTab label="Header" />
        <CustomTab label="Req Body" />
      </CustomTabs>
      <Box sx={{ p: 3 }} />
    </Box>
  );
};

export const Default: Story = {
  args: {
    value: 0,
  },
  render: (args) => <Template {...args} />,
};
