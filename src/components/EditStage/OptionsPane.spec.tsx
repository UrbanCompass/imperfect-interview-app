import React from 'react';
import userEvent from '@testing-library/user-event';

import { MUSIC_TRACKS } from '@/constants';
import { getRenderWithContext, render, screen } from '@helpers/testingLibraryUtils';
import { MusicTrack, GlobalContextValue, StateContextValue } from '@/types';

import { OptionsPane } from './OptionsPane';

const AUDIO_TRACK_SWITCH_TEXT = 'Add Audio Track';

const MUSIC_TEST_CASES = MUSIC_TRACKS.reduce((res, { tracks }) => {
  return [...res, ...tracks];
}, [] as MusicTrack[]).map(({ label }) => label);

describe('OptionsPane', (): void => {
  it('renders an audio switch and a default music track with the ability to disable audio', (): void => {
    render(<OptionsPane />);

    const checkbox = screen.getByLabelText(AUDIO_TRACK_SWITCH_TEXT);
    expect(checkbox).toBeVisible();
    expect(checkbox).toBeChecked();

    const happyTogether = screen.getByLabelText('Happy together');
    expect(happyTogether).toBeChecked();

    userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(happyTogether).toBeChecked();
    expect(happyTogether).toBeDisabled();
  });

  it('renders an unchecked audio switch which if the music is not initially set', (): void => {
    const stateContext = {
      music: null,
    } as StateContextValue;

    const customRender = getRenderWithContext({} as GlobalContextValue, stateContext);

    customRender(<OptionsPane />);

    const checkbox = screen.getByLabelText(AUDIO_TRACK_SWITCH_TEXT);
    expect(checkbox).not.toBeChecked();
  });

  describe.each(MUSIC_TEST_CASES)('renders the audio option "%s"', (label) => {
    it('which is visible when the audio switch is checked', () => {
      render(<OptionsPane />);

      const audioOption = screen.getByLabelText(label);
      expect(audioOption).toBeVisible();
    });

    it('which is disabled when the audio switch is not checked', () => {
      render(<OptionsPane />);

      const checkbox = screen.getByLabelText(AUDIO_TRACK_SWITCH_TEXT);
      userEvent.click(checkbox);

      const audioOption = screen.getByLabelText(label);
      expect(audioOption).toBeDisabled();
    });

    it('which is checked when the option is clicked', () => {
      render(<OptionsPane />);

      const audioOption = screen.getByLabelText(label);

      userEvent.click(audioOption);

      expect(audioOption).toBeChecked();
    });
  });
});
