import { useEffect, useState } from "react";
import { WhatsAppContact } from "./whatsapp-contact";
import { hasWhatsApp } from "../config/contact";
import { Logo } from "./ui";
import { CountryFlag } from "./country-flag";
import type { Copy, Language } from "../locales";
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
} from "react-aria-components";

const languages: { id: Language; label: string; name: string }[] = [
  { id: "pt-BR", label: "PT", name: "Português brasileiro" },
  { id: "en", label: "EN", name: "English" },
  { id: "es", label: "ES", name: "Español" },
];
export function Header({
  t,
  language,
  onLanguage,
  onContact,
}: {
  t: Copy;
  language: Language;
  onLanguage: (language: Language) => void;
  onContact: () => void;
}) {
  const [hidden, setHidden] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      // The navbar is tied to the page position, not the scroll direction.
      // Once the user leaves the top area it stays hidden until they return.
      setHidden(Math.max(window.scrollY, 0) > 96);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contactAreas = document.querySelectorAll("#contato, footer.footer");
    const visibleAreas = new Set<Element>();
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleAreas.add(entry.target);
          else visibleAreas.delete(entry.target);
        });
        setFooterVisible(visibleAreas.size > 0);
      },
      { threshold: 0.01 },
    );
    contactAreas.forEach((area) => footerObserver.observe(area));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      footerObserver?.disconnect();
    };
  }, []);

  const floatingActionsVisible = hidden && !footerVisible;

  return (
    <>
      <header className={`header ${hidden ? "header-hidden" : ""}`}>
        <div className="container navbar">
          <Logo animated />
          <div className="nav-actions">
            <Select
              aria-label="Idioma / Language / Idioma"
              selectedKey={language}
              onSelectionChange={(key) => {
                if (key) onLanguage(key as Language);
              }}
            >
              <Button className="language-trigger">
                <CountryFlag language={language} />
                <span>
                  {languages.find((item) => item.id === language)?.label}
                </span>
                <span aria-hidden="true">⌄</span>
              </Button>
              <Popover className="language-popover" placement="bottom end">
                <ListBox className="language-options" items={languages}>
                  {(item) => (
                    <ListBoxItem
                      id={item.id}
                      textValue={item.name}
                      className="language-option"
                    >
                      <CountryFlag language={item.id} />
                      <span>{item.name}</span>
                      <span className="language-check" aria-hidden="true">
                        ✓
                      </span>
                    </ListBoxItem>
                  )}
                </ListBox>
              </Popover>
            </Select>
            <button className="button header-contact" onClick={onContact}>
              {t.contactShort}
            </button>
          </div>
        </div>
      </header>

      <Select
        className={`floating-language ${floatingActionsVisible ? "is-visible" : ""}`}
        aria-label="Idioma / Language / Idioma"
        selectedKey={language}
        isDisabled={!floatingActionsVisible}
        onSelectionChange={(key) => {
          if (key) onLanguage(key as Language);
        }}
      >
        <Button
          className="floating-language-trigger"
          aria-hidden={!floatingActionsVisible}
          aria-label={languages.find((item) => item.id === language)?.name}
        >
          <CountryFlag language={language} />
        </Button>
        <Popover
          className="language-popover floating-language-popover"
          placement="top end"
        >
          <ListBox className="language-options" items={languages}>
            {(item) => (
              <ListBoxItem
                id={item.id}
                textValue={item.name}
                className="language-option"
              >
                <CountryFlag language={item.id} />
                <span>{item.name}</span>
                <span className="language-check" aria-hidden="true">
                  ✓
                </span>
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </Select>

      {hasWhatsApp && floatingActionsVisible && <WhatsAppContact t={t} />}
      {!hasWhatsApp && (
        <button
          type="button"
          className={`floating-contact ${floatingActionsVisible ? "is-visible" : ""}`}
          onClick={onContact}
          aria-label={t.contactShort}
          aria-hidden={!floatingActionsVisible}
          tabIndex={floatingActionsVisible ? 0 : -1}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7.2 18.3 3.8 20l1.1-3.8A8 8 0 1 1 7.2 18.3Z" />
            <path d="M8.2 10.1h7.6M8.2 13.6h4.9" />
          </svg>
        </button>
      )}
    </>
  );
}
