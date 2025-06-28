import React from 'react';
import { Story, Meta } from '@storybook/react';
import DiceRoller, { DiceRollerProps } from './DiceRoller';

export default {
  title: 'Components/DiceRoller',
  component: DiceRoller,
  argTypes: {
    playerColor: { control: 'color' },
    initialDiceType: {
      control: {
        type: 'select',
        options: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100']
      }
    },
    onRollComplete: { action: 'rolled' }
  }
} as Meta;

const Template: Story<DiceRollerProps> = (args) => <DiceRoller {...args} />;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'Default dice roller'
};

export const WithPlayerColor = Template.bind({});
WithPlayerColor.args = {
  playerColor: '#9c27b0',
  ariaLabel: 'Purple player dice roller'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  ariaLabel: 'Disabled dice roller'
};

export const CustomInitialDice = Template.bind({});
CustomInitialDice.args = {
  initialDiceType: 'd12',
  ariaLabel: 'Starts with d12 selected'
};

export const WithRollHistory = Template.bind({});
WithRollHistory.args = {
  initialDiceType: 'd6',
  ariaLabel: 'Dice roller with history tracking'
};