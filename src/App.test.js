import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('it should mount', () => {
    const app = render(<App />);
    const appId = app.getByTestId("App");
    expect(appId).toBeInTheDocument();
});