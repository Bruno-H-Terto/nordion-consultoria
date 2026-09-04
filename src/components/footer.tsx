import { ArrowUpRight } from "@untitledui/icons";
import { Logo } from "./ui";
import type { Copy } from "../locales";
export function Footer({
  t,
  onInfo,
}: {
  t: Copy;
  onInfo: (type: "privacy" | "terms" | "linkedin") => void;
}) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p>{t.footerText}</p>
            <span className="location">
              <span className="live-dot" />
              {t.location}
            </span>
          </div>
          <div>
            <h3>{t.nav[2]}</h3>
            {t.services.slice(0, 3).map(([title]) => (
              <a key={title} href="#servicos">
                {title}
              </a>
            ))}
          </div>
          <div>
            <h3>{t.company}</h3>
            <a href="#sobre">{t.nav[4]}</a>
            <a href="#como-funciona">{t.nav[1]}</a>
            <a href="#brasil">{t.nav[3]}</a>
          </div>
          <div>
            <h3>{t.nav[5]}</h3>
            <a href="#contato">
              {t.ctaPrimary} <ArrowUpRight size={14} />
            </a>
            <button onClick={() => onInfo("linkedin")}>
              LinkedIn <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Nordion. {t.rights}
          </span>
          <div>
            <button onClick={() => onInfo("privacy")}>{t.privacy}</button>
            <button onClick={() => onInfo("terms")}>{t.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
