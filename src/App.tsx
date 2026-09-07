import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Building07,
  Globe02,
  Scale01,
  Coins01,
  Users01,
  ShieldTick,
  Check,
  Compass03,
  XClose,
} from "@untitledui/icons";
import {
  Modal,
  ModalOverlay,
  Dialog,
  Heading as DialogHeading,
  Button as AriaButton,
} from "react-aria-components";
import { locales, initialLanguage, type Language } from "./locales";
import { SectionNavigation } from "./components/section-navigation";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Badge, Button, Heading, Card, FormField } from "./components/ui";
import { PhotoSection } from "./components/photo-section";
import { ServicesCarousel } from "./components/services-carousel";
import { OrbitScene } from "./components/orbit-scene";
import { PeopleBubbles } from "./components/people-bubbles";
import { hasWhatsApp, whatsappUrl } from "./config/contact";
import { OrganizationChart } from "./components/organization-chart";
import { CityLoop } from "./components/city-loop";
import { BrandUniverse } from "./components/brand-universe";
import { BusinessMosaic } from "./components/business-mosaic";
import { JourneyIcon } from "./components/journey-icon";
import { Typewriter } from "./components/typewriter";
import { ProcessExplorer } from "./components/process-explorer";
import { ValuesExplorer } from "./components/values-explorer";

import "./styles/app.css";

function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [modal, setModal] = useState<"contact" | "privacy" | "terms" | null>(
    null,
  );
  const t = locales[language];
  const openContact = () => {
    setModal("contact");
  };
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `Nordion | ${t.hero}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.intro);
    try {
      localStorage.setItem("nordion-language", language);
    } catch {
      /* Optional persistence. */
    }
  }, [language, t]);
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <SectionNavigation t={t} />
      <Header
        t={t}
        language={language}
        onLanguage={setLanguage}
        onContact={openContact}
      />
      <main id="main">
        <PhotoSection
          id="inicio"
          className="hero-section graphic-hero"
          priority
        >
          <div className="container hero-grid">
            <div className="hero-copy">
              <Badge>{t.eyebrow}</Badge>
              <h1>
                {t.hero}
                <br />
                <Typewriter key={language} phrases={t.heroPhrases} />
              </h1>
              <p>{t.intro}</p>
              <div className="button-row">
                <a className="button hero-button" href="#brasil">
                  {t.explore}
                  <ArrowDown size={18} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-note">
                <ShieldTick size={18} />
                {t.heroNote}
              </div>
            </div>
            <BrandUniverse t={t} />
            <div className="hero-side-note">
              <span>{t.scrollHint} ↓</span>
              <span>{t.heroNote}</span>
            </div>
          </div>
        </PhotoSection>
        <PhotoSection id="brasil" className="brazil-section" image="skyline">
          <div className="container brazil-grid">
            <OrbitScene />
            <div>
              <Heading
                label={t.brazilLabel}
                title={t.brazilTitle}
                text={t.brazilText}
              />
              <ul className="opportunities">
                {t.opportunities.map((o) => (
                  <li key={o}>
                    <ArrowUpRight size={20} />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PhotoSection>
        <PhotoSection id="abordagem" className="value-section graphic-value">
          <div className="container value-grid">
            <div>
              <Heading
                label={t.valueLabel}
                title={t.valueTitle}
                text={t.valueText}
              />
              <p className="value-quote">{t.valueQuote}</p>
            </div>
            <div className="journey">
              {t.journey.map((item, i) => (
                <div key={item} className={`journey-node node-${i}`}>
                  <JourneyIcon
                    label={item}
                    description={t.journeyHints[i]}
                    id={`journey-hint-${i}`}
                  >
                    {i === 0 ? (
                      <Building07 />
                    ) : i === 1 ? (
                      <Compass03 />
                    ) : (
                      <Globe02 />
                    )}
                  </JourneyIcon>
                  <strong>{item}</strong>
                  {i < 2 && <ArrowRight className="journey-arrow" />}
                </div>
              ))}
            </div>
          </div>
          <BusinessMosaic t={t} />
        </PhotoSection>
        <PhotoSection
          id="como-funciona"
          className="process-section surface-ivory"
        >
          <div className="container">
            <Heading
              label={t.processLabel}
              title={t.processTitle}
              text={t.processText}
              centered
            />
            <ProcessExplorer t={t} />
          </div>
        </PhotoSection>
        <PhotoSection
          id="servicos"
          className="services-section graphic-services"
        >
          <div className="container">
            <div className="split-heading">
              <Heading label={t.servicesLabel} title={t.servicesTitle} />
              <p>{t.servicesText}</p>
            </div>
            <ServicesCarousel t={t} />
            <p className="partners-note">
              <ShieldTick size={20} />
              {t.partners}
            </p>
          </div>
        </PhotoSection>
        <PhotoSection
          id="sobre"
          className="about-section surface-ivory graphic-about"
        >
          <ValuesExplorer t={t} />
        </PhotoSection>

        <PhotoSection id="quem-somos" className="who-section">
          <div className="container who-layout">
            <Heading label={t.whoLabel} title={t.whoTitle} />
            <div className="who-story">
              <p>{t.aboutText}</p>
              <p>{t.whoText}</p>
            </div>
            <div className="purpose-grid">
              <article>
                <h3>{t.missionLabel}</h3>
                <p>{t.mission}</p>
              </article>
              <article>
                <h3>{t.visionLabel}</h3>
                <p>{t.vision}</p>
              </article>
            </div>
          </div>
        </PhotoSection>

        <PhotoSection id="equipe" className="team-section graphic-team">
          <div className="container team-section-inner">
            <div className="team-section-heading">
              <span className="eyebrow">{t.teamLabel}</span>
              <h2>{t.teamTitle}</h2>
            </div>
            <PeopleBubbles t={t} />
          </div>
        </PhotoSection>

        <PhotoSection id="organograma" className="organization-section">
          <div className="container">
            <OrganizationChart t={t} />
          </div>
        </PhotoSection>

        <PhotoSection id="contato" className="cta-section graphic-cta">
          <div className="container cta-experience">
            <div className="cta-copy">
              <span className="eyebrow">{t.ctaLabel}</span>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
              <div className="button-row">
                <Button onClick={openContact}>{t.ctaPrimary}</Button>
                <a
                  className="contact-email"
                  href="mailto:nordionconsultoria@gmail.com"
                >
                  nordionconsultoria@gmail.com
                </a>
              </div>
              <span className="cta-decoration" aria-hidden="true">
                ↗
              </span>
            </div>
            <CityLoop />
          </div>
        </PhotoSection>
        <PhotoSection id="faq" className="faq-section">
          <div className="container">
            <Heading label="FAQ" title={t.faqTitle} text={t.faqIntro} />
            <div className="faq-list">
              <details className="faq-item">
                <summary>
                  {t.challengesLabel}
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="disclosure-content">
                  <div className="detail-inner">
                    <div className="split-heading">
                      <h3>{t.problemTitle}</h3>
                      <p>{t.problemText}</p>
                    </div>
                    <div className="grid four">
                      {t.problems.map((title, i) => {
                        const Icon = [Scale01, Coins01, Users01, Building07][i];
                        return (
                          <Card key={title} className="problem-card">
                            <Icon size={25} />
                            <h3>{title}</h3>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </details>
              <details className="faq-item">
                <summary>
                  {t.coordinationLabel}
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="disclosure-content">
                  <div className="detail-inner">
                    <h3>{t.differenceTitle}</h3>
                    <p>{t.differenceText}</p>
                    <div className="comparison">
                      <Card className="traditional">
                        <span className="eyebrow">{t.traditional}</span>
                        <div className="company-node">
                          <Building07 size={22} />
                          {t.journey[0]}
                        </div>
                        <div className="supplier-grid">
                          {t.suppliers.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                        <p>{t.fragmented}</p>
                      </Card>
                      <Card className="integrated">
                        <span className="eyebrow">{t.integrated}</span>
                        <div className="company-node">
                          <Building07 size={22} />
                          {t.journey[0]}
                        </div>
                        <div className="coordination-node">
                          <Compass03 size={22} />
                          nordion.
                        </div>
                        <div className="supplier-grid">
                          {t.suppliers.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                        <p>
                          <Check size={17} />
                          {t.coordinated}
                        </p>
                      </Card>
                    </div>
                  </div>
                </div>
              </details>
              <details className="faq-item">
                <summary>
                  {t.exampleLabel}
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="disclosure-content">
                  <div className="scenario-box">
                    <div>
                      <h3>{t.scenarioTitle}</h3>
                      <p>{t.scenarioText}</p>
                      <h3>{t.scenarioAnswer}</h3>
                    </div>
                    <div>
                      <ol className="scenario-path">
                        {t.scenarioSteps.map((s, i) => (
                          <li key={s}>
                            <span>
                              {i === 4 ? <Check size={16} /> : `0${i + 1}`}
                            </span>
                            {s}
                            {i < 4 && <ArrowRight size={16} />}
                          </li>
                        ))}
                      </ol>
                      <p className="scenario-note">{t.scenarioNote}</p>
                    </div>
                  </div>
                </div>
              </details>
              <details className="faq-item">
                <summary>
                  {t.audienceSummary}
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="disclosure-content">
                  <div className="detail-inner">
                    <h3>{t.audienceTitle}</h3>
                    <div className="grid three audiences">
                      {t.audiences.map((title, i) => {
                        const Icon = [Globe02, Building07, Users01][i];
                        return (
                          <Card key={title}>
                            <span className="icon-box">
                              <Icon />
                            </span>
                            <h3>{title}</h3>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </PhotoSection>
      </main>

      <Footer t={t} onInfo={setModal} onContact={openContact} />
      <ModalOverlay
        className="modal-overlay"
        isOpen={modal !== null}
        onOpenChange={(open) => {
          if (!open) setModal(null);
        }}
        isDismissable
      >
        <Modal className="modal">
          <Dialog className="dialog">
            <AriaButton
              className="modal-close"
              aria-label={t.close}
              onPress={() => setModal(null)}
            >
              <XClose />
            </AriaButton>
            <DialogHeading slot="title">
              {modal === "contact"
                ? t.contactTitle
                : modal === "privacy"
                  ? t.privacy
                  : t.terms}
            </DialogHeading>
            {modal === "contact" ? (
              <>
                <p>{t.contactText}</p>
                <a
                  className="contact-email"
                  href="mailto:nordionconsultoria@gmail.com"
                >
                  {t.emailAction}: nordionconsultoria@gmail.com
                </a>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    const name = String(data.get("name") ?? "").trim();
                    const email = String(data.get("email") ?? "").trim();
                    const business = String(data.get("business") ?? "").trim();
                    const message = [
                      `*${t.contactTitle}*`,
                      "",
                      `${t.name}: ${name}`,
                      `${t.email}: ${email}`,
                      `${t.business}: ${business}`,
                    ].join("\n");
                    const url = whatsappUrl(message);
                    window.location.assign(
                      url ??
                        `mailto:nordionconsultoria@gmail.com?subject=${encodeURIComponent(t.contactTitle)}&body=${encodeURIComponent(message)}`,
                    );
                  }}
                >
                  <FormField name="name" label={t.name} />
                  <FormField name="email" label={t.email} type="email" />
                  <FormField name="business" label={t.business} />
                  <button className="button my-6 w-full" type="submit">
                    {hasWhatsApp ? t.whatsappContact : t.emailAction}
                    <ArrowUpRight size={18} />
                  </button>
                </form>
              </>
            ) : (
              <p>{modal === "privacy" ? t.privacyText : t.termsText}</p>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
export default App;
