---
applyTo: '**'
---
GitHub Copilot Instructions
In frontend: Review your changes according to the guidelines below:

Use mobile first approach
Use margin-inline or margin-block no right or left or top or bottom.
Support dark mode and light mode
Use theme always don't hardcode colors (use CSS variables from globals.css)
Don't use inline styles or sx prop
Use FC for creating new components
Review your changes and remove unused imports or unused variables.
Start each interface with I for example IComponentProps
When creating a new component, use the following file structure:
Component/
  Component.tsx
  Component.styles.ts (if needed)
  Component.types.ts
  Component.utils.ts (if needed)
  Component.constants.ts (if needed)
  Component.hooks.ts (if needed)
  index.ts (To export the component)
Use react-hook-form for form handling
Use @tanstack/react-query for data fetching (when needed)
Use Next.js App Router for routing (not react-router-dom)
Use next-intl for internationalization
Use app/[locale] folder for pages with i18n support
Use components folder for new components
Use lib folder for utilities and shared logic
Use types folder for new types
Use constants folder for new constants
Use hooks folder for new hooks
Update messages/he.json and messages/en.json for translations
Ignore prettier errors of spaces or line breaks whatever it is
Use lucide-react for icons
Use framer-motion for animations
Use recharts for charts and data visualization
Use MDX for blog posts (content/posts folder)
Use clsx and tailwind-merge (cn utility) for conditional classes
Use Tailwind CSS for styling