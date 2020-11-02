import loadable from '@loadable/component';
import { PickerFileMetadata, PickerResponse } from 'filestack-js';
import React from 'react';
import { createAsset } from '@uc/thrift2npme/dist/asset_library/asset_library_service.ucfetch';

import initLogger from '@uc/logger';
import { AssetType, Media, GlobalContextValue } from '@/types';
import { useGlobalContext } from '@/hooks';
import { FILESTACK_API_KEY } from '@/constants';

const ReactFilestack = loadable(() => import('filestack-react'), { ssr: false });

interface PhotoUploaderProps {
  onUpload: (uploads: Media[]) => void;
}

export function PhotoUploader({ onUpload }: PhotoUploaderProps): JSX.Element {
  const { opty } = useGlobalContext() as GlobalContextValue;
  const logger = initLogger();

  function onUploadSuccess(result: PickerResponse): void {
    if (result?.filesUploaded?.length) {
      const uploads = result.filesUploaded.map((file: PickerFileMetadata) => {
        return {
          originalUrl: file.url,
          isCustomUpload: true,
        } as Media;
      });

      // Save uploaded images to the asset library (VG-109)
      if (opty?.features?.video_generator_save_uploaded_images_as_assets) {
        try {
          (async function saveUploadedImage(): Promise<void> {
            // mc-side-panel.react has to be imported async to prevent errors during SSR.
            const { convertFilestackFileToAsset, fetchOrCreateBaseFolder } = await import(
              '@uc/mc-side-panel.react'
            );
            result.filesUploaded.forEach(async (file: PickerFileMetadata) => {
              const fileAsset = await convertFilestackFileToAsset(file);
              const { id: folderId } = await fetchOrCreateBaseFolder();
              await createAsset({ asset: { ...fileAsset, folderId, type: AssetType.INDIVIDUAL } });
            });
          })();
        } catch (err) {
          logger.error(err, 'Unable to save uploaded image to the Asset Library.');
        }
      }

      onUpload(uploads);
    }
  }

  return (
    <ReactFilestack
      apikey={FILESTACK_API_KEY}
      action="pick"
      actionOptions={{
        fromSources: ['local_file_system', 'googledrive'],
        accept: ['image/*'],
        maxFiles: 10,
        maxSize: 100 * 1024 * 1024, // 100 MB - same as Asset Library
        disableTransformer: true,
      }}
      componentDisplayMode={{
        type: 'button',
        customText: 'Upload Image',
        customClass: 'cx-solidBtn cx-solidBtn--lowEmph',
      }}
      onSuccess={onUploadSuccess}
    />
  );
}
