import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Switch } from '@uc/cx.react';

import { Panel } from '@/components/common';
import { MUSIC_TRACKS, TRACKS_PER_CATEGORY } from '@/constants';
import { useStateContext } from '@/hooks';
import { MusicCategory, MusicTrack, StateContextValue } from '@/types';
import {
  trackAudioDisabled,
  trackAudioPaused,
  trackAudioPlayed,
  trackAudioSelected,
} from '@/utils';

import { MusicOption } from './MusicOption';

const PanelHeader = styled.div`
  font: var(--cx-font-shorthandBody);
  padding: 20px;
`;
PanelHeader.displayName = 'PanelHeader';

const MusicCategoryHeader = styled.div`
  border-bottom: 1px solid var(--cx-color-border);
  color: var(--cx-color-mediumNeutral);
  font: var(--cx-font-shorthandXsStrong);
  margin-top: 20px;
  padding: 8px 35px;
  text-align: left;
  text-transform: uppercase;
`;
MusicCategoryHeader.displayName = 'MusicCategoryHeader';

export function OptionsPane(): JSX.Element {
  const { music, autoGenerated, videoUrl, setMusic } = useStateContext() as StateContextValue;
  const [audioEnabled, setAudioEnabled] = useState(!!music);
  const [playingIndex, setPlayingIndex] = useState(-1);

  function handleEnableAudio(): void {
    if (audioEnabled) {
      setPlayingIndex(-1);
      setMusic(null);
      trackAudioDisabled(autoGenerated, videoUrl);
    }
    setAudioEnabled(!audioEnabled);
  }

  function handlePlayMusic(index: number, track: MusicTrack, shouldPause: boolean): void {
    if (shouldPause) {
      setPlayingIndex(-1);
      trackAudioPaused(track);
    } else {
      setPlayingIndex(index);
      trackAudioPlayed(track);
    }
  }

  function handleSelectMusic(index: number, track: MusicTrack): void {
    handlePlayMusic(index, track, false /* shouldPause */);
    setMusic(track);
    trackAudioSelected(track, autoGenerated, videoUrl);
  }

  return (
    <Panel style={{ right: '0' }}>
      <PanelHeader css={{ paddingBottom: '0' }}>
        <Switch checked={audioEnabled} onChange={handleEnableAudio}>
          Add Audio Track
        </Switch>
      </PanelHeader>
      <div css={{ margin: '16px' }}>
        {MUSIC_TRACKS.map((category: MusicCategory, categoryIndex: number) => {
          return (
            <React.Fragment key={category.name}>
              <MusicCategoryHeader>{category.label}</MusicCategoryHeader>
              {category.tracks.map((track: MusicTrack, trackIndex: number) => {
                const index = categoryIndex * TRACKS_PER_CATEGORY + trackIndex;
                return (
                  <MusicOption
                    key={index}
                    label={track.label}
                    category={category.name}
                    track={track.name}
                    handlePlay={(shouldPause): void => {
                      handlePlayMusic(index, track, shouldPause);
                    }}
                    handleSelect={(): void => {
                      handleSelectMusic(index, track);
                    }}
                    isPlaying={playingIndex === index}
                    disabled={!audioEnabled}
                    defaultSelected={music?.name === track.name}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </Panel>
  );
}
