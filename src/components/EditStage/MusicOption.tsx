import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Poptip, Radio, usePoptipOnHover } from '@uc/cx.react';

interface MusicOptionProps {
  label: string;
  category: string;
  track: string;
  isPlaying?: boolean;
  disabled?: boolean;
  defaultSelected?: boolean;
  handlePlay: (shouldPause: boolean) => void;
  handleSelect: () => void;
}

const iconBase = css`
  display: inline-block;
  vertical-align: bottom;
`;

const playIcon = css`
  ${iconBase};
  border-color: transparent transparent transparent var(--cx-color-black);
  border-style: solid;
  border-width: 7px 0px 7px 14px;
  box-sizing: border-box;
  height: 14px;
  width: 14px;
`;

const pauseIcon = css`
  ${iconBase};
  border-color: var(--cx-color-black);
  border-style: double;
  border-width: 0px 0px 0px 10px;
  height: 12px;
  left: 6px;
  position: relative;
  width: 12px;
`;

const disabledColor = css`
  border-left-color: var(--cx-color-textDisabled);
`;

const Container = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--cx-color-border);
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  label:hover {
    cursor: pointer;
  }
`;
Container.displayName = 'Container';

const PlayPauseButton = styled.div`
  height: 36px;
  width: 36px;
  &:hover {
    background-color: var(--cx-color-dropShadow);
    border-radius: 50%;
    cursor: pointer;
  }
`;
PlayPauseButton.displayName = 'PlayPauseButton';

export function MusicOption({
  label,
  category,
  track,
  isPlaying,
  disabled,
  defaultSelected,
  handlePlay,
  handleSelect,
}: MusicOptionProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { poptipProps, getPoptipAnchorProps } = usePoptipOnHover();

  function playMusic(): void {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play();
    }
  }

  function pauseMusic(): void {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
  }

  useEffect(() => {
    if (disabled || !isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  return (
    <Container>
      <Radio
        name="musicOption"
        value={track}
        defaultChecked={defaultSelected}
        onChange={handleSelect}
        disabled={disabled}
        css={{ padding: '4px 8px' }}
      >
        {label}
      </Radio>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} hidden loop>
        <source
          src={`/ucfe-assets/listing-video-editor/eks-2020-05-27-21-38-d0fc778/${category}/${track}.mp3`}
          type="audio/mpeg"
        />
      </audio>
      <PlayPauseButton
        onClick={(): void => {
          if (!disabled) handlePlay(!!isPlaying);
        }}
        {...getPoptipAnchorProps('Preview track', 'left')}
      >
        <div css={[isPlaying ? pauseIcon : playIcon, disabled ? disabledColor : '']} />
      </PlayPauseButton>
      {!disabled && !isPlaying && <Poptip {...poptipProps} />}
    </Container>
  );
}
