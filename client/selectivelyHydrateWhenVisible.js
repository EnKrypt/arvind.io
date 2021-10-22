import { hydrate } from 'preact';
import { lazy, Suspense } from 'preact/compat';

const selectivelyHydrateWhenVisible = (componentName, lazyImportFunction) => {
  document
    .querySelectorAll(`script[data-component-name="${componentName}"]`)
    .forEach((element) => {
      const hydrationTargetContainer = element.nextElementSibling;
      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          observer.unobserve(hydrationTargetContainer.firstChild);
          const props = JSON.parse(element.innerHTML);
          const Component = lazy(lazyImportFunction);
          hydrate(
            <Suspense fallback={<></>}>
              <Component {...props} />
            </Suspense>,
            hydrationTargetContainer
          );
        }
      }, {});
      observer.observe(hydrationTargetContainer.firstChild);
    });
};

export default selectivelyHydrateWhenVisible;
