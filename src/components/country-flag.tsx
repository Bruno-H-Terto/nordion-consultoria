import type { Language } from "../locales";

export function CountryFlag({ language }: { language: Language }) {
  return (
    <svg className="country-flag" viewBox="0 0 30 20" aria-hidden="true">
      {language === "pt-BR" ? (
        <>
          <path fill="#229E45" d="M0 0h30v20H0z" />
          <path fill="#FFDF00" d="m15 2 12 8-12 8L3 10z" />
          <circle cx="15" cy="10" r="4.5" fill="#22428F" />
          <path d="M11 8.5q4-1 8 3" stroke="white" fill="none" />
        </>
      ) : language === "en" ? (
        <>
          <path fill="#fff" d="M0 0h30v20H0z" />
          {Array.from({ length: 7 }, (_, i) => (
            <path
              key={i}
              fill="#B22234"
              d={`M0 ${(i * 40) / 13}h30v${20 / 13}H0z`}
            />
          ))}
          <path fill="#3C3B6E" d="M0 0h13v11H0z" />
          {[2, 5.5, 9].map((y) =>
            [2, 5, 8, 11].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="0.65" fill="white" />
            )),
          )}
        </>
      ) : (
        <>
          <path fill="#AA151B" d="M0 0h30v20H0z" />
          <path fill="#F1BF00" d="M0 5h30v10H0z" />
          <path fill="#AA151B" d="M8 8h4v4l-2 1-2-1z" />
        </>
      )}
    </svg>
  );
}
