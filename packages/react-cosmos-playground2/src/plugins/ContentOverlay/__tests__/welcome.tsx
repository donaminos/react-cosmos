import { render } from '@testing-library/react';
import React from 'react';
import { loadPlugins, Slot, resetPlugins } from 'react-plugin';
import {
  mockRendererCore,
  mockRendererPreview,
  mockRouter,
  mockStorage,
} from '../../../testHelpers/pluginMocks';

beforeEach(() => jest.isolateModules(() => require('..')));

afterEach(resetPlugins);

function registerTestPlugins() {
  mockStorage();
  mockRouter({
    getSelectedFixtureId: () => null,
  });
  mockRendererCore({
    isRendererConnected: () => true,
    isValidFixtureSelected: () => false,
  });
  mockRendererPreview({
    getUrlStatus: () => 'ok',
    getRuntimeStatus: () => 'connected',
  });
}

function loadTestPlugins() {
  loadPlugins();
  return render(<Slot name="contentOverlay" />);
}

it('renders "welcome" state', () => {
  registerTestPlugins();
  const { queryByTestId } = loadTestPlugins();
  expect(queryByTestId('welcome')).not.toBeNull();
});
