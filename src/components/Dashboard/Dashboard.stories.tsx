import React from 'react';
import { Story, Meta } from '@storybook/react';
import Dashboard, { DashboardProps } from './Dashboard';
import { mockCharacters, mockCampaigns, mockActivities } from './dashboard.mocks';

export default {
  title: 'Components/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<DashboardProps> = (args) => <Dashboard {...args} />;

export const Default = Template.bind({});
Default.args = {
  characters: mockCharacters,
  campaigns: mockCampaigns,
  recentActivities: mockActivities,
  onCreateCharacter: () => console.log('Create Character clicked'),
  onJoinCampaign: () => console.log('Join Campaign clicked'),
  onRollDice: () => console.log('Roll Dice clicked'),
  onOpenCombat: () => console.log('Open Combat clicked'),
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: new Error('Failed to load dashboard data'),
};

export const Empty = Template.bind({});
Empty.args = {
  characters: [],
  campaigns: [],
  recentActivities: [],
  onCreateCharacter: () => console.log('Create Character clicked'),
  onJoinCampaign: () => console.log('Join Campaign clicked'),
  onRollDice: () => console.log('Roll Dice clicked'),
  onOpenCombat: () => console.log('Open Combat clicked'),
};