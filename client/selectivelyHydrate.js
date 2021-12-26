import { hydrate } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const selectivelyHydrate = (
  scriptElement,
  hydrationTarget,
  lazyImportFunction
) => {
  const props = JSON.parse(scriptElement.innerHTML);
  const Component = lazy(lazyImportFunction);
  hydrate(
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>,
    hydrationTarget
  );
};

export const selectivelyHydrateWhenVisible = (
  componentName,
  lazyImportFunction
) => {
  document
    .querySelectorAll(`script[data-component-name="${componentName}"]`)
    .forEach((element) => {
      const hydrationTarget = element.nextElementSibling;
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(hydrationTarget.firstChild);
          selectivelyHydrate(element, hydrationTarget, lazyImportFunction);
        }
      });
      observer.observe(hydrationTarget.firstChild);
    });
};

export const selectivelyHydrateWhenTargetInvisible = (
  componentName,
  lazyImportFunction,
  target
) => {
  const scriptElements = document.querySelectorAll(
    `script[data-component-name="${componentName}"]`
  );
  if (scriptElements.length) {
    const observer = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) {
        observer.unobserve(target);
        scriptElements.forEach((element) => {
          selectivelyHydrate(
            element,
            element.nextElementSibling,
            lazyImportFunction
          );
        });
      }
    });
    observer.observe(target);
  }
};
