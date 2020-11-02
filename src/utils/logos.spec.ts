import { getLogoForAgent } from './logos';

describe('getLogoForAgent', () => {
  const team = {
    id: 'test-team-id',
    email: 'test-team@example.com',
  };
  const agent = {
    personId: 'test-agent-id',
    email: 'test-agent@example.com',
  };

  it('preferentially returns the logo corresponding to the team id', () => {
    const logos = [
      {
        logoAgentIds: ['test-agent-id'],
      },
      {
        logoAgentIds: ['test-team-id'],
      },
    ];
    expect(getLogoForAgent(logos, agent, team)).toBe(logos[1]);
  });

  it('preferentially returns the logo corresponding to the team email', () => {
    const logos = [
      {
        logoAgentIds: ['test-agent-id'],
      },
      {
        logoAgentIds: ['test-team@example.com'],
      },
    ];
    expect(getLogoForAgent(logos, agent, team)).toBe(logos[1]);
  });

  it('returns the logo corresponding to the agent id if no logo with the team id/email is found', () => {
    const logos = [
      {
        logoAgentIds: ['test-agent-id'],
      },
    ];
    expect(getLogoForAgent(logos, agent, team)).toBe(logos[0]);
  });

  it('returns the logo corresponding to the agent email if no logo with the team id/email is found', () => {
    const logos = [
      {
        logoAgentIds: ['test-agent@example.com'],
      },
    ];
    expect(getLogoForAgent(logos, agent, team)).toBe(logos[0]);
  });

  it('ignores all logoAgentIds entries other than the last one', () => {
    const logos = [
      {
        logoAgentIds: ['test-agent-id', 'other-id-1'],
      },
      {
        logoAgentIds: ['test-team-id', 'other-id-2'],
      },
    ];
    expect(getLogoForAgent(logos, agent, team)).toBe(undefined);
  });

  it('returns undefined when neither the teamId nor the agentId is matched', () => {
    const logos = [
      {
        logoAgentIds: ['other-id-1'],
      },
      {
        logoAgentIds: ['other-id-2'],
      },
    ];
    expect(getLogoForAgent(logos, agent, team)).toBe(undefined);
  });

  it('returns undefined when the list of logos is empty', () => {
    expect(getLogoForAgent([], agent, team)).toBe(undefined);
  });
});
