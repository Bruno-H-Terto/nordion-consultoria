import { useState } from 'react';
import { Menu01, XClose } from '@untitledui/icons';
import { Logo, Button } from './ui';
import type { Copy, Language } from '../locales';
const anchors = ['inicio', 'como-funciona', 'servicos', 'brasil', 'sobre', 'contato'];
export function Header({ t, language, onLanguage }: { t: Copy; language: Language; onLanguage: (language: Language) => void }) {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="container navbar"><Logo/><nav id="navigation" aria-label={t.menu} className={open ? 'navigation open' : 'navigation'}>{t.nav.map((item, i) => <a key={anchors[i]} href={`#${anchors[i]}`} onClick={() => setOpen(false)}>{item}</a>)}</nav><div className="nav-actions"><select aria-label="Idioma / Language / Idioma" value={language} onChange={e => onLanguage(e.target.value as Language)}><option value="pt-BR">PT</option><option value="en">EN</option><option value="es">ES</option></select><Button href="#contato" className="nav-cta">{t.consult}</Button><button className="menu-toggle" aria-label={open ? t.close : t.menu} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <XClose/> : <Menu01/>}</button></div></div></header>;
}
