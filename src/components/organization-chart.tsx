import type { Copy } from "../locales";
import { createTeamMembers } from "../data/team";
export function OrganizationChart({ t }: { t: Copy }) {
  const members = createTeamMembers(t);
  return (
    <div className="organization-chart" aria-label={t.orgTitle}>
      <h2>{t.orgTitle}</h2>
      <p>{t.orgText}</p>
      {[[0], [1, 2, 4], [3, 6, 5]].map((row, index) => (
        <ul className={`organization-tier tier-${index}`} key={index}>
          {row.map((i) => (
            <li key={members[i].id}>
              <strong>{members[i].role}</strong>
              <span className="organization-member">{members[i].name}</span>
              <p>{t.orgRoleDescriptions[i]}</p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
