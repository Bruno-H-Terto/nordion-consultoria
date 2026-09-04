import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building07,
  Globe02,
  Scale01,
  Coins01,
  Users01,
  LayersThree01,
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
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import {
  Badge,
  Button,
  Heading,
  Card,
  TimelineStep,
  FormField,
} from "./components/ui";
import { PhotoSection } from "./components/photo-section";
import { ServicesCarousel } from "./components/services-carousel";
import { OrbitScene } from "./components/orbit-scene";
import "./App.css";

function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [modal, setModal] = useState<
    "contact" | "privacy" | "terms" | "linkedin" | null
  >(null);
  const [prepared, setPrepared] = useState(false);
  const t = locales[language];
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
      <Header t={t} language={language} onLanguage={setLanguage} />
      <main id="main">
        <PhotoSection
          id="inicio"
          className="hero-section"
          image="portrait"
          priority
        >
          <div className="container hero-grid">
            <div className="hero-copy">
              <Badge>{t.eyebrow}</Badge>
              <h1>
                {t.hero}
                <br />
                <span>{t.heroAccent}</span>
              </h1>
              <p>{t.intro}</p>
              <div className="button-row">
                <Button href="#contato">{t.primary}</Button>
                <a className="text-link" href="#sobre">
                  {t.secondary}
                  <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-note">
                <ShieldTick size={18} />
                {t.heroNote}
              </div>
            </div>
            <div className="hero-side-note">
              <span>01 / NORDION</span>
              <span>{t.heroNote}</span>
            </div>
          </div>
        </PhotoSection>
        <PhotoSection className="problem-section" image="architecture">
          <div className="container">
            <div className="split-heading">
              <Heading label={t.problemLabel} title={t.problemTitle} />
              <p>{t.problemText}</p>
            </div>
            <div className="grid four">
              {t.problems.map((title, i) => {
                const Icon = [Scale01, Coins01, Users01, Building07][i];
                return (
                  <Card key={title} className="problem-card">
                    <Icon size={25} />
                    <h3>{title}</h3>
                    <span className="small-arrow">↗</span>
                  </Card>
                );
              })}
            </div>
          </div>
        </PhotoSection>
        <PhotoSection className="value-section" image="team">
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
                  <span>
                    {i === 0 ? (
                      <Building07 />
                    ) : i === 1 ? (
                      <Compass03 />
                    ) : (
                      <Globe02 />
                    )}
                  </span>
                  <strong>{item}</strong>
                  {i < 2 && <ArrowRight className="journey-arrow" />}
                </div>
              ))}
            </div>
          </div>
        </PhotoSection>
        <PhotoSection
          id="como-funciona"
          className="process-section"
          image="planning"
        >
          <div className="container">
            <Heading
              label={t.processLabel}
              title={t.processTitle}
              text={t.processText}
              centered
            />
            <ol className="timeline">
              {t.steps.map(([title, text], i) => (
                <TimelineStep
                  key={title}
                  number={i + 1}
                  title={title}
                  text={text}
                />
              ))}
            </ol>
          </div>
        </PhotoSection>
        <PhotoSection
          id="servicos"
          className="services-section"
          image="planning"
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
        <PhotoSection className="difference-section" image="team">
          <div className="container">
            <Heading
              label={t.differenceLabel}
              title={t.differenceTitle}
              text={t.differenceText}
              centered
            />
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
        </PhotoSection>
        <PhotoSection
          id="brasil"
          className="brazil-section"
          image="architecture"
        >
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
        <PhotoSection className="audience-section" image="founder">
          <div className="container">
            <Heading label={t.audienceLabel} title={t.audienceTitle} centered />
            <div className="grid three audiences">
              {t.audiences.map((title, i) => {
                const Icon = [Globe02, Building07, Users01][i];
                return (
                  <Card key={title}>
                    <span className="icon-box">
                      <Icon />
                    </span>
                    <h3>{title}</h3>
                    <a href="#contato" aria-label={`${t.ctaPrimary}: ${title}`}>
                      <ArrowUpRight />
                    </a>
                  </Card>
                );
              })}
            </div>
          </div>
        </PhotoSection>
        <PhotoSection className="scenario-section" image="founder">
          <div className="container scenario-box">
            <div>
              <Heading label={t.scenarioLabel} title={t.scenarioTitle} />
              <p>{t.scenarioText}</p>
              <h3>{t.scenarioAnswer}</h3>
            </div>
            <div>
              <ol className="scenario-path">
                {t.scenarioSteps.map((s, i) => (
                  <li key={s}>
                    <span>{i === 4 ? <Check size={16} /> : `0${i + 1}`}</span>
                    {s}
                    {i < 4 && <ArrowRight size={16} />}
                  </li>
                ))}
              </ol>
              <p className="scenario-note">{t.scenarioNote}</p>
            </div>
          </div>
        </PhotoSection>
        <PhotoSection id="sobre" className="about-section" image="portrait">
          <div className="container about-grid">
            <Heading label={t.aboutLabel} title={t.aboutTitle} />
            <div>
              <p className="about-text">{t.aboutText}</p>
              <div className="values">
                {t.values.map((v) => (
                  <span key={v}>
                    <Check size={15} />
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </PhotoSection>
        <PhotoSection id="contato" className="cta-section" image="team">
          <div className="container cta-inner">
            <span className="eyebrow">{t.ctaLabel}</span>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
            <div className="button-row">
              <Button
                onClick={() => {
                  setPrepared(false);
                  setModal("contact");
                }}
              >
                {t.ctaPrimary}
              </Button>
              <Button href="#como-funciona" secondary>
                {t.ctaSecondary}
              </Button>
            </div>
            <span className="cta-decoration" aria-hidden="true">
              ↗
            </span>
          </div>
        </PhotoSection>
      </main>
      <Footer t={t} onInfo={setModal} />
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
                  : modal === "terms"
                    ? t.terms
                    : "LinkedIn"}
            </DialogHeading>
            {modal === "contact" ? (
              <>
                <p>{t.contactText}</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPrepared(true);
                  }}
                >
                  <FormField name="name" label={t.name} />
                  <FormField name="email" label={t.email} type="email" />
                  <FormField name="business" label={t.business} />
                  <FormField name="message" label={t.message} multiline />
                  <p className="form-note">{t.contactNote}</p>
                  <button className="button" type="submit">
                    {t.send}
                    <ArrowUpRight size={18} />
                  </button>
                  {prepared && (
                    <p role="status" className="success-message">
                      {t.success}
                    </p>
                  )}
                </form>
              </>
            ) : (
              <p>
                {modal === "privacy"
                  ? t.privacyText
                  : modal === "terms"
                    ? t.termsText
                    : t.linkedinText}
              </p>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
export default App;
