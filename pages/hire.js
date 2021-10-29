import styled from 'styled-components';
import withHydration from '../client/withHydration';
import { StyledLink, Subtext } from '../components/Atoms';
import HireAvailability from '../components/HireAvailability';
import Layout from '../components/Layout';
import { commonExtractor } from '../extractors';
import theme from '../theme';

const HydratedHireAvailability = withHydration(
  HireAvailability,
  'HireAvailability'
);

const Hire = ({ config, fontFaces }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: 'Hire me' }}>
    <HirePage>
      <div>
        I am an individual contractor and offer services for software
        development and consulting.
      </div>
      <Subtext>
        If you wish to hire me for a different purpose, consider{' '}
        <StyledLink href="mailto:mail@arvind.io">writing me a mail</StyledLink>{' '}
        instead.
      </Subtext>
      <HydratedHireAvailability />
      <div>
        I have experience developing and deploying diverse tech solutions at
        scale for small, medium and large businesses over the past decade. My
        proficiency includes software design and architecture in the following
        domains:
      </div>
    </HirePage>
  </Layout>
);

const HirePage = styled.div`
  font-size: 1.25em;

  & div {
    padding: 0.5em 0;
  }

  & .available {
    color: ${theme.colors.green};
  }

  & .unavailable {
    color: ${theme.colors.red};
  }
`;

export const getStaticProps = async (context) => {
  const { config, fontFaces } = await commonExtractor();
  return {
    props: {
      config,
      fontFaces
    }
  };
};

export default Hire;
