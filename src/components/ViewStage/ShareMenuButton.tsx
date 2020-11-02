import copy from 'copy-to-clipboard';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

import { Button, Icon, OptionsMenu, Flyout } from '@uc/cx.react';
import { buildSocialMediaUrl, SocialMediaPlatforms } from '@uc/social-media-urls';

interface ShareMenuButtonProps {
  videoUrl: string;
  title: string;
  coverImageUrl: string;
}

const MenuItem = styled.div`
  display: flex;
`;
MenuItem.displayName = 'MenuItem';

const COPY_LINK_ID = 'copy';
const SHARE_OPTIONS = [
  { id: COPY_LINK_ID, label: 'Copy Link', icon: Icon.Link },
  { id: SocialMediaPlatforms.FACEBOOK, label: 'Facebook', icon: Icon.Facebook },
  { id: SocialMediaPlatforms.TWITTER, label: 'Twitter', icon: Icon.Twitter },
  { id: SocialMediaPlatforms.LINKED_IN, label: 'LinkedIn', icon: Icon.LinkedIn },
  { id: SocialMediaPlatforms.PINTEREST, label: 'Pinterest', icon: Icon.Pinterest },
];

export function ShareMenuButton({ videoUrl, title, coverImageUrl }: ShareMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  function handleSelect(type: SocialMediaPlatforms | string) {
    setIsOpen(false);

    if (type === COPY_LINK_ID) {
      copy(videoUrl);
    } else {
      const data = {
        url: videoUrl,
        description: title,
        media: coverImageUrl,
      };
      const url = buildSocialMediaUrl(type, data);
      window.open(url);
    }
  }

  return (
    <>
      <Button
        ref={anchorRef}
        variant="enclosed"
        icon="ArrowBoxRight"
        onClick={() => setIsOpen(!isOpen)}
        css={{ marginLeft: '16px' }}
      >
        Share
      </Button>
      <Flyout anchor={anchorRef.current} isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <OptionsMenu isOpen={isOpen}>
          {SHARE_OPTIONS.map((option) => (
            <OptionsMenu.Item key={option.id} onSelect={() => handleSelect(option.id)}>
              <MenuItem>
                <option.icon css={{ margin: 'auto 6px auto 0', width: '20px' }} />
                {option.label}
              </MenuItem>
            </OptionsMenu.Item>
          ))}
        </OptionsMenu>
      </Flyout>
    </>
  );
}
