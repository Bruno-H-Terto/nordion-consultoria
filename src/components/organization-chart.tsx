import type { Copy } from "../locales";
import { createTeamMembers } from "../data/team";
export function OrganizationChart({ t }: { t: Copy }) {
  const members = createTeamMembers(t);
  return (
    <div className="organization-chart" aria-label={t.orgTitle}>
      <h3>{t.orgTitle}</h3>
      <p>{t.orgText}</p>
      {[[0], [1, 2], [6, 3, 4, 5]].map((row, index) => (
        <ul className={`organization-tier tier-${index}`} key={index}>
          {row.map((i) => (
            <li key={members[i].id}>
              <strong>{members[i].name}</strong>
              <span>{members[i].role}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
