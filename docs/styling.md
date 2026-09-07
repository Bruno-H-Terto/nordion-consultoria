# Styling architecture

`src/index.css` loads Tailwind, font assets, theme tokens, and document defaults.
`src/styles/app.css` is the single application stylesheet entry point. Import order is intentional:

1. `foundation.css`: existing shared components and base layout.
2. `editorial.css`: editorial composition and interaction effects.
3. `graphic.css`: section-specific graphic compositions.
4. `scenes.css`: animated visual scenes.
5. `refinements.css`: existing component refinements.
6. `viewport.css`: viewport sizing and responsive variants.
7. `landscape.css`: short landscape viewport adaptations.

Floating navigation, language and contact controls, and form fields use Tailwind utilities directly in their React components. Their previous selector rules have been removed. Shared control dimensions remain CSS custom properties so all controls use the same horizontal axis and safe-area insets.

The remaining graphic and animation styles retain their cascade during the incremental migration. Migrate a component together with every rule that targets it, including responsive and state selectors. Do not add competing utility classes while leaving the same property in unlayered legacy CSS. Avoid introducing `!important` overrides to fix layout conflicts.

`landscape.css` uses Tailwind `@apply` for shared layout primitives and CSS for viewport-specific geometry. Scope landscape adaptations by both orientation and available height; desktop landscape screens must retain their composition.

Verify desktop, portrait mobile, and short landscape dimensions after changes. Expanded content must remain reachable by scrolling, and controls must not overlap one another. Keep decorative animations in CSS or scene components rather than replacing them with duplicated utility strings.

Reference: [Tailwind directives](https://tailwindcss.com/docs/functions-and-directives).
