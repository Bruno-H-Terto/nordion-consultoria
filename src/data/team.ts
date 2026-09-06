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
const photoNames = [
  "camila-d-nortion",
  "faby-nordion",
  "fernando-nordion",
  "ana-nordion",
  "ricardo-nordion",
  "eliza-nordion",
  "camila-m-nordion",
];

export function createTeamMembers(t: Copy): TeamMember[] {
  return Array.from({ length: 7 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `team-${number}`,
      name: names[index],
      role: t.teamRoles[index],
      bio: t.teamBios[index],
      thumb: `/images/team/${photoNames[index]}-1.png`,
      profile: `/images/team/${photoNames[index]}-2.png`,
    };
  });
}
