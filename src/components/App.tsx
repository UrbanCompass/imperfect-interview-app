/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import serialize from 'serialize-javascript';

import { LoadingSpinner } from '@uc/cx.react';

import { getCanvas, getLogos, getTeam, loadListings } from '@/api';
import { Centered } from '@/components/common';
import { GlobalContext, StateContext } from '@/contexts';
import { MUSIC_TRACKS, STAGE } from '@/constants';
import {
  Address,
  AgentInfo,
  GetCanvasResponse,
  Globals,
  LogoStatus,
  Media,
  MusicTrack,
  Preferences,
  StateContextValue,
  Team,
  ProcessedListing,
  VideoType,
  ListingStatusFilter,
} from '@/types';
import { getDefaultAgentInfo, getLogoForAgent, loadBrandingListings } from '@/utils';

import { Global, css } from '@emotion/core';
import { InputStage } from './InputStage';
import { SelectStage } from './SelectStage';
import { EditStage } from './EditStage';
import { ProgressStage } from './ProgressStage';
import { ViewStage } from './ViewStage';

interface AppProps {
  globals: Globals;
}

interface MatchParams {
  canvasId?: string;
}

export function App({ globals }: AppProps): JSX.Element {
  const matchParams = useRouteMatch({
    path: '/edit/:canvasId',
    strict: true,
    sensitive: true,
  })?.params as MatchParams;
  const params = new URLSearchParams(useLocation().search);
  const listingIdSHA = params.get('listingIdSHA');
  const digitalAdId = params.get('digitalAdId');

  const [canvasId, setCanvasId] = useState(matchParams?.canvasId || null);
  const [isLoading, setIsLoading] = useState(!!canvasId);

  const [listings, setListings] = useState([] as ProcessedListing[]);
  const [address, setAddress] = useState({ title: '', subtitle: '' } as Address);
  const [customUploads, setCustomUploads] = useState<Media[]>([]);
  const [stage, setStage] = useState(STAGE.INPUT);
  const [media, setMedia] = useState([] as Media[]);
  const [music, setMusic] = useState(MUSIC_TRACKS[0].tracks[0] as MusicTrack | null);
  const [team, setTeam] = useState(null as Team | null);
  const [agentInfo, setAgentInfo] = useState({} as AgentInfo);
  const [preferences, setPreferences] = useState({
    showAgentBranding: true,
    showCompassLogo: true,
  } as Preferences);
  const [videoUrl, setVideoUrl] = useState(null as string | null);
  const [thumbnailUri, setThumbnailUri] = useState(null as string | null);
  const [autoGenerated, setAutoGenerated] = useState(false as boolean);
  const [videoType, setVideoType] = useState(
    globals.opty?.features?.video_generator_agent_branding_video
      ? VideoType.UNSET
      : VideoType.LISTING
  );
  const [listingStatusFilter, setListingStatusFilter] = useState(-1 as ListingStatusFilter);

  const stateContextValue = useMemo(
    (): StateContextValue => ({
      listings,
      address,
      customUploads,
      media,
      music,
      preferences,
      videoUrl,
      autoGenerated,
      videoType,
      listingStatusFilter,
      canvasId,
      thumbnailUri,
      setStage,
      setListings,
      setAddress,
      setCustomUploads,
      setMedia,
      setMusic,
      setPreferences,
      setVideoUrl,
      setAutoGenerated,
      setVideoType,
      setListingStatusFilter,
      setCanvasId,
      setThumbnailUri,
    }),
    [
      listings,
      serialize(address),
      serialize(media),
      music,
      serialize(preferences),
      videoUrl,
      canvasId,
      thumbnailUri,
      autoGenerated,
      videoType,
      listingStatusFilter,
      customUploads,
    ]
  );
  const globalContextValue = useMemo(
    () => ({
      user: globals.user,
      opty: globals.opty,
      team,
      listingIdSHA,
      digitalAdId,
      agentInfo,
      setAgentInfo,
    }),
    [serialize(team), serialize(agentInfo)]
  );

  const agentId = globals?.user?.personId;
  const teamId = globals?.user?.agentProfile?.teams?.[0].teamId;

  useEffect(() => {
    (async function initCanvas(): Promise<void> {
      if (canvasId) {
        const response = (await getCanvas(canvasId)) as GetCanvasResponse;
        const { canvas } = response;
        if (canvas?.body?.data) {
          const properties = JSON.parse(canvas.body.data);

          const loadListingsResponse = await loadListings({
            listingIdSHAs: [properties.listingIdSHA],
          });

          if (loadListingsResponse.listings == null || loadListingsResponse.listings.length === 0) {
            return;
          }

          const fullListing = loadListingsResponse.listings[0];

          setListings([fullListing]);
          setMedia(properties.media);
          setAddress(properties.address);
          setMusic(properties.music);
          setPreferences(properties.preferences);
          setCustomUploads(properties.media?.filter((m: Media) => m.isCustomUpload));

          setStage(STAGE.SELECT);
          setIsLoading(false);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async function initTeam(): Promise<void> {
      let agentTeam;
      if (teamId) {
        const response = await getTeam(teamId, {});
        agentTeam = response.team;
        setTeam(agentTeam);
      }
    })();
  }, [teamId]);

  useEffect(() => {
    (async function initLogo(): Promise<void> {
      let logo;
      if (agentId) {
        // For the purpose of the logo_repo API, agentIds is a list of hex IDs and email addresses
        // for all entities that logos can be assigned to: agents and teams.
        const agentIds = [agentId];
        if (globals?.user?.email) agentIds.push(globals?.user?.email);

        // Wait until the team data has loaded, then get logos with the team's id/email.
        if (teamId && !team) return;
        if (team) {
          if (team.id) agentIds.push(team.id);
          if (team.email) agentIds.push(team.email);
        }

        // Unavailable means the logo cannot be used by another agent as
        // it has been "claimed".
        const response = await getLogos({
          agentIds,
          statuses: [LogoStatus.UNAVAILABLE],
        });
        if (response?.logos) {
          logo = getLogoForAgent(response.logos, globals.user!, team);
        }
      }
      setAgentInfo(getDefaultAgentInfo(globals.user, team, logo));
    })();
  }, [agentId, teamId, team]);

  useEffect((): void => {
    if (videoType === VideoType.BRANDING && listingStatusFilter !== -1) {
      (async function fetchBrandingListings(): Promise<void> {
        const newListings = await loadBrandingListings(globals.user!, listingStatusFilter);
        setListings(newListings);
      })();
    }
  }, [videoType, listingStatusFilter]);

  if (isLoading) {
    return (
      <Centered>
        <LoadingSpinner size="lg" />
      </Centered>
    );
  }

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <StateContext.Provider value={stateContextValue}>
        <Global
          styles={css`
            * {
              box-sizing: border-box;
            }
          `}
        />
        <main>
          {stage === STAGE.INPUT && <InputStage />}
          {stage === STAGE.SELECT && <SelectStage />}
          {stage === STAGE.EDIT && <EditStage />}
          {stage === STAGE.PROGRESS && <ProgressStage />}
          {stage === STAGE.VIEW && <ViewStage />}
        </main>
      </StateContext.Provider>
    </GlobalContext.Provider>
  );
}
