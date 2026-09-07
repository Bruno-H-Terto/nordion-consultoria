import { useEffect, useState } from "react";
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
      setHidden(Math.max(window.scrollY, 0) > 96);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };
    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("footer.footer");
    const footerObserver = footer
      ? new IntersectionObserver(
          ([entry]) => setFooterVisible(entry?.isIntersecting ?? false),
          { threshold: 0.01 },
        )
      : null;
    if (footer) footerObserver?.observe(footer);

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
        className={`floating-language fixed right-[var(--control-right)] bottom-[calc(var(--control-bottom)+var(--control-size)+var(--control-gap))] z-40 w-[var(--control-size)] transition-opacity motion-reduce:transition-none ${floatingActionsVisible ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}
        aria-label="Idioma / Language / Idioma"
        selectedKey={language}
        isDisabled={!floatingActionsVisible}
        onSelectionChange={(key) => {
          if (key) onLanguage(key as Language);
        }}
      >
        <Button
          className="floating-language-trigger grid size-[var(--control-size)] place-items-center rounded-full border border-[#cdc5bd99] bg-[#252d35e8] p-0 text-[#f8f3ed]! shadow-[0_0_0_1px_#cdc5bd1f,0_8px_24px_#00000038] backdrop-blur-md hover:border-[#f8f3edcc] hover:bg-[#34414d] [&_.country-flag]:h-[19px] [&_.country-flag]:w-7"
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

      {floatingActionsVisible && (
        <button
          type="button"
          className="floating-contact fixed right-[var(--control-right)] bottom-[var(--control-bottom)] z-40 grid size-[var(--control-size)] place-items-center rounded-full border border-[#f8f3ed30] bg-[#ad6438] p-0 shadow-lg hover:bg-[#884c28]"
          onClick={onContact}
          aria-label={t.contactShort}
          aria-hidden={!floatingActionsVisible}
          tabIndex={floatingActionsVisible ? 0 : -1}
        >
          <img
            className="block size-7 object-contain"
            src="/brand/contact.png"
            width="28"
            height="28"
            alt=""
          />
        </button>
      )}
    </>
  );
}
