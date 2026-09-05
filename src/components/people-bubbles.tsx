import { useState, type CSSProperties } from "react";
import type { Copy } from "../locales";
import { createTeamMembers, type TeamMember } from "../data/team";

function Portrait({ src, name }: { src?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="professional-portrait">
      {src && !failed ? (
        <img src={src} alt={name} onError={() => setFailed(true)} />
      ) : (
        <svg viewBox="0 0 100 120" aria-hidden="true">
          <circle cx="50" cy="38" r="19" />
          <path d="M14 114V94a36 36 0 0 1 72 0v20" />
        </svg>
      )}
    </span>
  );
}
export function PeopleBubbles({
  t,
  members = createTeamMembers(t),
}: {
  t: Copy;
  members?: TeamMember[];
}) {
  const [active, setActive] = useState(0);
  const selected = members[active] ?? members[0];
  if (!selected) return null;
  return (
    <div className="professional-team">
      <div
        className="professional-selector"
        role="group"
        aria-label={t.teamLabel}
      >
        <svg
          className="constellation-links"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="300" cy="300" r="225" />
          {[
            [-0.0, -225],
            [176, -140],
            [219, 50],
            [98, 203],
            [-98, 203],
            [-219, 50],
            [-176, -140],
          ].map(([x, y], i) => (
            <path key={i} d={`M300 300L${300 + x} ${300 + y}`} />
          ))}
        </svg>
        <span className="constellation-logo" aria-hidden="true">
          <img src="/brand/nordion-symbol.png" alt="" />
        </span>
        {members.slice(0, 7).map((member, index) => (
          <div
            className="professional-float"
            key={member.id}
            style={
              {
                "--delay": `${index * -1.4}s`,
                "--star-x": `${50 + Math.sin((index * Math.PI * 2) / 7) * 36}%`,
                "--star-y": `${47 - Math.cos((index * Math.PI * 2) / 7) * 35}%`,
              } as CSSProperties
            }
          >
            <button
              type="button"
              className="professional-card"
              aria-pressed={index === active}
              aria-controls="professional-detail"
              onClick={() => setActive(index)}
              aria-label={`${member.name} — ${member.role}`}
            >
              <Portrait
                key={member.thumb ?? member.id}
                src={member.thumb}
                name=""
              />
              <span>{member.name}</span>
              <span className="professional-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          </div>
        ))}
      </div>
      <article
        className="professional-detail"
        id="professional-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <div key={selected.id} className="professional-detail-content">
          <div className="professional-photo">
            <Portrait
              key={selected.profile ?? selected.id}
              src={selected.profile}
              name={`${t.teamPortrait} ${selected.name}`}
            />
          </div>
          <div className="professional-copy">
            <span className="eyebrow">{selected.role}</span>
            <h3>{selected.name}</h3>
            <p>{selected.bio}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
