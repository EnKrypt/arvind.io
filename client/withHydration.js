/*
 * This is a HOC that freezes the props during build in the DOM.
 * During hydration, the props are picked up from here and sent
 * to the component identified by the data from the script tag.
 *
 * This technique is widely used by sites that use progressive
 * hydration as a performance improving strategy for web apps
 * that target large audiences. Examples: Amazon, YouTube, etc.
 * Apollo GraphQL client is an example of a library that makes
 * use of this strategy in how it similarly renders APOLLO_DATA.
 *
 * All components to be hydrated need to have distinct names as
 * the component name is used to identify the hydration targets.
 */

const withHydration = (Component, componentName) => {
  return (props) => (
    <>
      <script
        type="application/json"
        data-type="hydration-props"
        data-component-name={componentName}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }}
      />
      <div className="hydration-target">
        <Component {...props} />
      </div>
    </>
  );
};

export default withHydration;
