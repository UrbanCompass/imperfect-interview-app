import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Checkbox, Toast } from '@uc/cx.react';

import {
  ListingDetails,
  NavBar,
  PhotoUploader,
  SquareImage,
  StepIndicator,
} from '@/components/common';
import { Media, MediaCategory, StateContextValue, VideoType } from '@/types';
import { useStateContext } from '@/hooks';
import {
  trackImageSelected,
  trackImageSelectionPageViewed,
  trackImageUnselected,
  trackImagesSelected,
  trackImagesUploaded,
} from '@/utils';
import { STAGE, NUM_IMAGES_REQUIRED } from '@/constants';
import { trackBrandingImageSelectionPageViewed } from '@/utils/analytics';
import { arrayWithItems, arrayWithoutItems } from '@/utils/arrays';
import { ListingStatusSelect } from '../common/ListingStatusSelect';

const Header = styled.div`
  align-items: center;
  background-color: var(--cx-color-faintNeutral);
  display: flex;
  font: var(--cx-font-shorthandBody);
  justify-content: space-between;
  padding: 12px 40px;
`;
Header.displayName = 'Header';

const Disclaimer = styled.span`
  color: var(--cx-color-darkNeutral);
  font: var(--cx-font-shorthandXs);
  margin: 0 10px;
  width: 220px;
`;
Disclaimer.displayName = 'Disclaimer';

const ListingStatusFilter = styled.div`
  margin-left: 24px;
  padding-left: 24px;
  border-left: 1px solid var(--cx-color-border);
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;
Controls.displayName = 'Controls';

const ListingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-left: 50px;
`;
ListingHeader.displayName = 'ListingHeader';

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 300px;
  justify-content: left;
  padding: 0px 40px;
`;
ImageWrapper.displayName = 'ImageWrapper';

const SectionSeparator = styled.span`
  border-bottom: 1px solid var(--cx-color-border);
  margin: 30px 80px 30px 50px;
`;
SectionSeparator.displayName = 'SectionSeparator';

export function SelectStage(): JSX.Element {
  const {
    listings,
    media,
    videoUrl,
    autoGenerated,
    videoType,
    listingStatusFilter,
    customUploads,
    setStage,
    setMedia,
    setListingStatusFilter,
    setCustomUploads,
  } = useStateContext() as StateContextValue;
  const [error, setError] = useState('');

  const uploadedImagesRef = useRef<HTMLDivElement>(null);

  function isValidImageType(m: Media): boolean {
    return m.category === MediaCategory.PHOTO || m.category === MediaCategory.FLOORPLAN;
  }

  function handleUploadImage(newUploads: Media[]): void {
    trackImagesUploaded(newUploads.length, autoGenerated, videoUrl);
    setCustomUploads(customUploads.concat(newUploads));

    if (uploadedImagesRef?.current) {
      uploadedImagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function imageOption(m: Media): JSX.Element {
    return (
      <label
        className="cx-formElement cx-checkBlock-display"
        css={{ margin: '10px' }}
        key={m.originalUrl}
        htmlFor={m.originalUrl}
      >
        <input
          id={m.originalUrl}
          className="cx-checkboxField"
          css={{ position: 'absolute', right: '20px', top: '24px' }}
          type="checkbox"
          checked={media.some((existingMedia) => m.originalUrl === existingMedia.originalUrl)}
          onChange={(evt): void => {
            const { checked } = evt.target;
            if (checked) {
              trackImageSelected(autoGenerated, videoUrl);
              setMedia(arrayWithItems<Media>(media, m));
            } else {
              trackImageUnselected(autoGenerated, videoUrl);
              setMedia(arrayWithoutItems<Media>(media, m));
            }
          }}
        />
        <SquareImage imageUrl={m.originalUrl!} width={300} />
      </label>
    );
  }

  useEffect(() => {
    if (videoType === VideoType.LISTING) {
      trackImageSelectionPageViewed(listings[0], autoGenerated, videoUrl);
    } else if (videoType === VideoType.BRANDING) {
      trackBrandingImageSelectionPageViewed(listingStatusFilter, autoGenerated, videoUrl);
    }
  }, [listingStatusFilter]);

  useEffect(() => {
    if (videoType === VideoType.LISTING) {
      if (listings.length === 0 || listings[0] == null) {
        setError('Something went wrong. Please refresh the page and try again');
      } else if (!listings[0]?.media || listings[0]?.media.length < NUM_IMAGES_REQUIRED) {
        setError(
          'This listing doesnt have the requisite number of images. Please select another listing'
        );
      }
    } else if (videoType === VideoType.BRANDING) {
      if (
        listings.reduce((mediaCount, listing) => mediaCount + listing.media!.length, 0) <
        NUM_IMAGES_REQUIRED
      ) {
        setError('You don’t have enough content to generate this type of branding video.');
      } else {
        setError('');
      }
    }
  }, [listings]);

  useEffect(() => {
    if (media.length >= NUM_IMAGES_REQUIRED) {
      setError('');
    }
  });

  return (
    <>
      {listings.length > 0 && <ListingDetails listing={listings[0]} />}
      <NavBar>
        <Button
          variant="enclosed"
          onClick={(): void => {
            setStage(STAGE.INPUT);
          }}
        >
          Back
        </Button>
        <StepIndicator selectedStep={1} />
        <Button
          variant="solid"
          disabled={!!error}
          onClick={(): void => {
            if (media.length < NUM_IMAGES_REQUIRED) {
              setError('Please select at least 1 image to continue');
            } else if (media.length > 998) {
              // The limitation we set is 1000 clips total, which also includes agent card and logo clip.
              setError('Please select less than 999 images to continue');
            } else {
              trackImagesSelected(listings[0], listings[0].media, autoGenerated, videoUrl);
              setStage(STAGE.EDIT);
            }
          }}
        >
          Continue
        </Button>
      </NavBar>
      <div css={{ position: 'relative', top: '128px' }}>
        <Header>
          Please select at least 1 image
          <Controls>
            <Disclaimer>
              Please make sure you have the rights to use any images you upload.
            </Disclaimer>
            <PhotoUploader onUpload={handleUploadImage} />
            {videoType === VideoType.BRANDING && (
              <ListingStatusFilter>
                <ListingStatusSelect
                  onChange={(evt): void => {
                    setListingStatusFilter(+evt.target.value);
                  }}
                  value={`${listingStatusFilter}`}
                />
              </ListingStatusFilter>
            )}
          </Controls>
        </Header>
        <div className="cx-mainLayout">
          {videoType === VideoType.LISTING && (
            <>
              <Controls>
                <Checkbox
                  checked={listings[0].media!.every((m) => media.includes(m as Media))}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                    const { checked } = event.target;
                    if (checked) {
                      setMedia(arrayWithItems<Media>(media, listings[0].media! as Media[]));
                    } else {
                      setMedia(arrayWithoutItems<Media>(media, listings[0].media! as Media[]));
                    }
                  }}
                  css={{ margin: '40px 80px 10px' }}
                >
                  Select All
                </Checkbox>
              </Controls>
              <ImageWrapper>
                {listings[0].media?.map((m) =>
                  isValidImageType(m as Media) ? imageOption(m as Media) : null
                )}
              </ImageWrapper>
            </>
          )}
          {videoType === VideoType.BRANDING &&
            listings.map((listing) => (
              <div key={listing.listingIdSHA}>
                <ListingHeader>
                  {listing.location && (
                    <div className="textIntent-title2">{listing.location.agentAddress}</div>
                  )}
                  <Controls>
                    <Checkbox
                      checked={listing.media!.every((m) => media.includes(m as Media))}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        const { checked } = event.target;
                        if (checked) {
                          setMedia(arrayWithItems<Media>(media, listing.media! as Media[]));
                        } else {
                          setMedia(arrayWithoutItems<Media>(media, listing.media! as Media[]));
                        }
                      }}
                      css={{ margin: '40px 80px 10px' }}
                    >
                      Select All
                    </Checkbox>
                  </Controls>
                </ListingHeader>
                <ImageWrapper>
                  {listing
                    .media!.slice(0, 3) /* Temporary, we need UX for showing additional images */
                    .map((m) => (isValidImageType(m as Media) ? imageOption(m as Media) : null))}
                </ImageWrapper>
              </div>
            ))}
          {customUploads.length > 0 && (
            <>
              <SectionSeparator />
              <div ref={uploadedImagesRef} css={{ marginBottom: '10px', marginLeft: '50px' }}>
                Image Uploads
              </div>
              <ImageWrapper>{customUploads.map((m: Media) => imageOption(m))}</ImageWrapper>
            </>
          )}
        </div>
      </div>
      {error && (
        <Toast isOpen variant="error" css={{ position: 'fixed', zIndex: 100 }}>
          {error}
        </Toast>
      )}
    </>
  );
}