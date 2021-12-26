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

import {
  selectivelyHydrateWhenVisible,
  selectivelyHydrateWhenTargetInvisible
} from './selectivelyHydrate';

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

selectivelyHydrateWhenVisible('NotFoundEffects', () =>
  import('../components/NotFoundEffects')
);

selectivelyHydrateWhenVisible('PostImage', () =>
  import('../components/PostImage')
);

selectivelyHydrateWhenTargetInvisible(
  'Comments',
  () => import('../components/Comments'),
  document.getElementsByClassName('post')[0]
);

// Easter egg clue
console.log(
  `%cYou found this text! Well done, but will you ascend?.\nFind the source and begin your quest if you intend.`,
  `color: #0094ff;`
);
/*
 *  https://i.imgur.com/6vbAVMf.png
 */
