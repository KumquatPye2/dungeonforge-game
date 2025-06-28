import React from 'react';
import { Story, Meta } from '@storybook/react';
import Welcome, { WelcomeProps } from './Welcome';

export default {
  title: 'Components/Welcome',
  component: Welcome,
  argTypes: {
    onCharacterCreate: { action: 'characterCreate' },
  },
} as Meta;

const Template: Story<WelcomeProps> = (args) => <Welcome {...args} />;

export const Default = Template.bind({});
Default.args = {
  playerCount: 4,
};

export const Loading = Template.bind({});
Loading.args = {
  playerCount: 2,
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  playerCount: 5,
  error: 'Failed to connect to server',
};

export const NoPlayers = Template.bind({});
NoPlayers.args = {
  playerCount: 0,
};