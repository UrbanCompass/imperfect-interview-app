import {
  VideoClip,
  CreateGenerateVideoJobRequest,
  CreateGenerateVideoJobResponse,
  LookupGenerateVideoJobStatusRequest,
  LookupGenerateVideoJobStatusResponse,
} from '@/types';
import { createGenerateVideoJob, lookupGenerateVideoJobStatus } from '@/api';

const SPEC_VERISON = '1.0.0';

export async function handleGenerateWithAIVideoGenerator(
  music: string | undefined,
  clips: VideoClip[]
): Promise<CreateGenerateVideoJobResponse> {
  const req: CreateGenerateVideoJobRequest = {
    specVersion: SPEC_VERISON,
    backgroundMusic: music,
    clips,
  };

  const resp: CreateGenerateVideoJobResponse = await createGenerateVideoJob(req);

  return resp;
}

export async function handleCheckStatusWithAIVideoGenerator(
  jobId: string
): Promise<LookupGenerateVideoJobStatusResponse> {
  const req: LookupGenerateVideoJobStatusRequest = { jobId };

  const resp: LookupGenerateVideoJobStatusResponse = await lookupGenerateVideoJobStatus(req);

  return resp;
}
