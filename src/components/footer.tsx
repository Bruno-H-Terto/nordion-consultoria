import { ArrowUpRight } from "@untitledui/icons";
import { Logo } from "./ui";
import type { Copy } from "../locales";
export function Footer({
  t,
  onInfo,
  onContact,
}: {
  t: Copy;
  onContact: () => void;
  onInfo: (type: "privacy" | "terms") => void;
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
              <span className="footer-item" key={title}>
                {title}
              </span>
            ))}
          </div>
          <div>
            <h3>{t.company}</h3>
            <span className="footer-item">{t.aboutLabel}</span>
            <span className="footer-item">{t.heroNote}</span>
          </div>
          <div>
            <h3>{t.nav[5]}</h3>
            <a
              className="footer-item"
              href="mailto:nordinconsultoria@gmail.com"
            >
              nordinconsultoria@gmail.com
            </a>
            <a
              className="footer-item"
              href="https://www.instagram.com/nordionconsultoria/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <ArrowUpRight size={14} />
            </a>
            <button onClick={onContact}>
              {t.ctaPrimary} <ArrowUpRight size={14} />
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
