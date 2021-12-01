import React from 'react';

import { render } from '@testing-library/react';

import { clickDay, getDayButton, getTableFooter } from '../src/test/po';
import { freezeBeforeAll } from '../src/test/utils';
import Example from './single-required';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

let container: HTMLElement;
beforeEach(() => {
  container = render(<Example />).container;
});

describe('when a day is clicked', () => {
  const day = new Date(2021, 10, 1);
  beforeEach(() => clickDay(day));
  test('should appear as selected', () => {
    expect(getDayButton(day)).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
  test('should update the footer', () => {
    expect(getTableFooter()).toHaveTextContent(
      'You selected November 1st, 2021.'
    );
  });
  describe('when the day is clicked again', () => {
    beforeEach(() => clickDay(day));
    test('should appear as selected', () => {
      expect(getDayButton(day)).toHaveAttribute(
        'aria-pressed',
        'true'
      );
    });
  });
});