import type { Copy } from "../locales";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  thumb?: string;
  profile?: string;
};

// Conceptual portfolio profiles; deliberately do not impersonate real staff.
export function createTeamMembers(t: Copy): TeamMember[] {
  return Array.from({ length: 7 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `team-${number}`,
      name: `${t.teamMember} ${number}`,
      role: t.teamRole,
      bio: t.teamBio,
    };
  });
}
