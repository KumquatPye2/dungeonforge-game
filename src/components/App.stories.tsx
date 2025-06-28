import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'DungeonForge/App',
  component: App,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const Default = Template.bind({});
Default.parameters = {
  chromatic: { disableSnapshot: false },
};

export const LoadingState = Template.bind({});
LoadingState.parameters = {
  chromatic: { disableSnapshot: false },
};
LoadingState.decorators = [
  (Story) => {
    // Mock loading state
    jest.spyOn(React, 'useState').mockImplementation(() => [
      { isLoading: true, error: null, currentRoute: '/', theme: {} },
      jest.fn()
    ]);
    return <Story />;
  }
];