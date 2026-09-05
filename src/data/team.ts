import type { Copy } from "../locales";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  thumb?: string;
  profile?: string;
};

const names = [
  "Camila Delfino",
  "Faby",
  "Fernando",
  "Ana Carolina Lage",
  "Ricardo",
  "Eliza",
  "Camilla",
];
export function createTeamMembers(t: Copy): TeamMember[] {
  return Array.from({ length: 7 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `team-${number}`,
      name: names[index],
      role: t.teamRoles[index],
      bio: t.teamBios[index],
    };
  });
}
