import { Logo } from '@uc/thrift2npme/dist/logo_repo/logo_repo_models';
import { Person, Team } from '@/types';

export function getLogoForAgent(logos: Logo[], agent: Person, team: Team | null): Logo | undefined {
  // The last value in logoAgentIds indicates which agent/team the logo is currently assigned to.
  const associatedAgentIds = logos.map(
    (l) => l.logoAgentIds && l.logoAgentIds[l.logoAgentIds.length - 1]
  );

  // If a team logo is found, it should be preferred over the agent's own (VG-101).
  const teamLogo = team
    ? logos[associatedAgentIds.findIndex((id) => id === team.id || id === team.email)]
    : undefined;
  const agentLogo =
    logos[associatedAgentIds.findIndex((id) => id === agent.personId || id === agent.email)];
  return teamLogo || agentLogo;
}
