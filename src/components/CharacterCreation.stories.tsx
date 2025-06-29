import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CharacterCreation from './CharacterCreation';

export default {
  title: 'Character Creation',
  component: CharacterCreation,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
} as ComponentMeta<typeof CharacterCreation>;

const Template: ComponentStory<typeof CharacterCreation> = (args) => (
  <CharacterCreation {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};

export const Error = Template.bind({});
Error.args = {
  error: 'Failed to create character. Please try again.'
};

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
  onSubmit: (character: any) => console.log(character)
};