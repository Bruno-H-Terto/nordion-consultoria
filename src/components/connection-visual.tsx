import { Building07, Check, Globe02, ArrowUpRight } from '@untitledui/icons';
import type { Copy } from '../locales';
export function ConnectionVisual({ t }: { t: Copy }) {
  return <div className="connection-visual">
    <div className="visual-top"><span className="live-dot"/> NORDION GLOBAL CONNECT <ArrowUpRight size={15}/></div>
    <svg className="globe" viewBox="0 0 520 490" fill="none" aria-hidden="true">
      <defs><radialGradient id="globe-fill"><stop stopColor="#e1ebe7"/><stop offset="1" stopColor="#edf2ef"/></radialGradient><pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.25" fill="#91aaa1"/></pattern><clipPath id="sphere"><circle cx="270" cy="236" r="178"/></clipPath></defs>
      <circle cx="270" cy="236" r="207" stroke="#d6e1dc" strokeDasharray="3 8"/>
      <circle cx="270" cy="236" r="178" fill="url(#globe-fill)" stroke="#cbd9d2"/>
      <g clipPath="url(#sphere)" stroke="#c5d5cc" strokeWidth=".7"><ellipse cx="270" cy="236" rx="115" ry="178"/><ellipse cx="270" cy="236" rx="47" ry="178"/><ellipse cx="270" cy="236" rx="178" ry="65"/><ellipse cx="270" cy="236" rx="178" ry="126"/><path d="M90 236h360M270 55v360"/></g>
      <g fill="url(#dots)"><path d="m124 141 39-38 68-15 38 18-17 28-28 9-15 34-27 11-8 24-26-12-12-36-22-5Z"/><path d="m196 225 35 8 23 26 42 15 4 27-25 35-10 36-25 30-13-35-8-27-19-28 3-35-18-27Z"/><path d="m305 108 33-14 34 15 41 24 28 28-12 37-48 2-17-22-39 3-24-29Z"/><path d="m309 204 33-9 38 23 9 28-29 59-26 17-14-40-23-34Z"/></g>
      <path className="connection-line" d="M162 164Q323 120 256 290" stroke="#2F6F65" strokeWidth="2" strokeDasharray="5 6"/>
      <circle cx="162" cy="164" r="13" fill="#2F6F65" fillOpacity=".12"/><circle cx="162" cy="164" r="5" fill="#2F6F65"/>
      <circle className="destination-pulse" cx="256" cy="290" r="24" stroke="#2F6F65" strokeOpacity=".25"/><circle cx="256" cy="290" r="13" fill="#2F6F65" fillOpacity=".15"/><circle cx="256" cy="290" r="6" fill="#2F6F65"/>
    </svg>
    <div className="map-label origin"><span className="mini-icon"><Building07 size={18}/></span><span>{t.world}<small>GLOBAL BUSINESS</small></span></div>
    <div className="map-label target"><span className="mini-icon"><Globe02 size={20}/></span><span><small>{t.destination}</small><strong>{t.brazil}</strong></span><ArrowUpRight size={19}/></div>
    <div className="visual-bottom"><span className="check-circle"><Check size={15}/></span><div><strong>{t.connection}</strong><small>{t.operation}</small></div><div className="signal"><i/><i/><i/><i/></div></div>
    <div className="visual-caption">01 — {t.visualNote}<span>↗</span></div>
  </div>;
}
