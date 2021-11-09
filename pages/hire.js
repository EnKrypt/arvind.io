import styled from 'styled-components';
import withHydration from '../client/withHydration';
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
      <Para>
        I am an individual contractor and offer services for software
        development and consulting.
      </Para>
      <Subtext>
        If you wish to hire me for a different purpose, consider{' '}
        <a
          href="mailto:mail@arvind.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          writing me a mail
        </a>{' '}
        instead.
      </Subtext>
      <Para>
        <HydratedHireAvailability />
      </Para>
      <Para>
        I have experience developing and deploying diverse tech solutions at
        scale for small, medium and large businesses over the past decade. My
        proficiency includes software design and architecture in the following
        domains:
      </Para>
      <DomainPara>
        <DomainTitle>Frontend</DomainTitle>: Websites that are fast, fluid,
        performant and responsive. Single Page Applications (SPA) and
        Progressive Web Apps (PWA) with Gatsby or React, built for good SEO.
      </DomainPara>
      <DomainPara>
        <DomainTitle>Mobile</DomainTitle>: Reach your audience better with
        mobile apps written in React Native. Distribute for Android via the
        Google Play Store, and for iOS via the Apple App Store.
      </DomainPara>
      <DomainPara>
        <DomainTitle>Backend</DomainTitle>: APIs and services that are built to
        scale. Your business logic written in Typescript, Node.js, Java or
        Golang.
      </DomainPara>
      <DomainPara>
        <DomainTitle>DevOps</DomainTitle>: Deploy your product with high
        availability on AWS or GCP. No more surprise cloud bills or production
        downtime. Automate your entire infrastructure and deployment process
        with Ansible and Terraform.
      </DomainPara>
      <Subtext>
        Scroll down to check out some of my past domestic clients, or reach out
        for an in-depth portfolio of past work in the domain you are interested
        in.
      </Subtext>
      <Para>
        If you&apos;re someone who&apos;s just not sure where to get started
        with all the coding mess, you can still get in touch to understand and
        discuss your situation better. If necessary, I can provide abstract
        insights and pointers, and educate you about healthy industry standards
        and common pitfalls. You will not be charged unless you want
        consultation to specifically architect your business solution.
      </Para>
      <Para>
        Use this form to fill out your requirements or other details, and
        I&apos;ll get back to you with a quote (or answer) at no charge. You can
        also just email me at{' '}
        <a
          href="mailto:mail@arvind.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          mail@arvind.io
        </a>
      </Para>
    </HirePage>
  </Layout>
);

const HirePage = styled.div`
  font-size: 1.25em;

  & .available {
    color: ${theme.colors.green};
  }

  & .unavailable {
    color: ${theme.colors.red};
  }
`;

const Para = styled.div`
  padding: 0.5em 0;
`;

const Subtext = styled.div`
  font-size: 0.7em;
  padding: 0.7em 0;
  color: ${theme.colors.gray};
`;

const DomainPara = styled.div`
  font-size: 0.9em;
  font-weight: 300;
  padding: 0.3em 0;
`;

const DomainTitle = styled.div`
  display: inline-block;
  width: 4em;
  color: ${theme.colors.primary};
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
