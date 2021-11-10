/*
 * This particular entry point should be used only for hydration.
 * If you put any actual logic here, you will not see it execute
 * in development mode as this file is skipped and only bundled
 * for a production/prodish build. Think about how you can modify
 * your logic so that you can achieve the same goal via hydration.
 *
 * All components to be hydrated need to have distinct names as
 * the component name is used to identify the hydration targets.
 */

import selectivelyHydrateWhenVisible from './selectivelyHydrateWhenVisible';

selectivelyHydrateWhenVisible('ThemeChanger', () =>
  import('../components/ThemeChanger')
);

selectivelyHydrateWhenVisible('MenuButton', () =>
  import('../components/MenuButton')
);

selectivelyHydrateWhenVisible('HireAvailability', () =>
  import('../components/HireAvailability')
);

selectivelyHydrateWhenVisible('ContactForm', () =>
  import('../components/ContactForm')
);
