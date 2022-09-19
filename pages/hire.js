import styled from 'styled-components';
import withHydration from '../client/withHydration';
import ContactForm from '../components/ContactForm';
import HireAvailability from '../components/HireAvailability';
import Layout from '../components/Layout';
import { commonExtractor } from '../extractors';
import crioImage from '../public/images/clients/crio-light.png?resize';
import geektrustImage from '../public/images/clients/geektrust-light.png?resize';
import ideogramImage from '../public/images/clients/ideogram-light.png?resize';
import outreachcircleImage from '../public/images/clients/outreachcircle-light.png?resize';
import pickcelImage from '../public/images/clients/pickcel-light.png?resize';
import zyskImage from '../public/images/clients/zysk-light.png?resize';
import theme from '../theme';

const HydratedHireAvailability = withHydration(
  HireAvailability,
  'HireAvailability'
);

const HydratedContactForm = withHydration(ContactForm, 'ContactForm');

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
          rel="nofollow noopener noreferrer"
        >
          writing me a mail
        </a>{' '}
        instead.
      </Subtext>
      <Para>
        <HydratedHireAvailability endpoint={config.URL} />
      </Para>
      <Para>
        I have experience developing and deploying diverse tech solutions at
        scale for small, medium and large businesses over the past decade. My
        proficiency includes software engineering in the following domains:
      </Para>
      <DomainPara>
        <DomainTitle>Frontend</DomainTitle>: Websites that are fast, fluid,
        performant and responsive. Single Page Applications (SPA) and
        Progressive Web Apps (PWA) with React, including Next or Gatsby, built for good SEO.
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
        discuss your situation better. I can provide abstract insights and
        pointers, and educate you about healthy industry standards and common
        pitfalls. You will not be charged unless you want consultation to
        specifically architect your business solution.
      </Para>
      <HydratedContactForm endpoint={config.URL} />
      <ClientsPara>
        Some of my past local clients from my own city. I enjoy serving the
        Bangalore ambition.
      </ClientsPara>
      <ClientsGallery>
        <a href="https://crio.do/" target="_blank" rel="nofollow noopener noreferrer">
          <img
            alt="Crio"
            className="lazy"
            src={crioImage.placeholder || crioImage.src}
            data-srcset={crioImage.srcSet}
            data-sizes="(max-width: 768px) 220px, 300px"
          />
        </a>
        <a href="https://mallik.in/" target="_blank" rel="nofollow noopener noreferrer">
          <img
            alt="Ideogram"
            className="lazy"
            src={ideogramImage.placeholder || ideogramImage.src}
            data-srcset={ideogramImage.srcSet}
            data-sizes="(max-width: 768px) 220px, 300px"
          />
        </a>
        <a href="https://zysk.tech/" target="_blank" rel="nofollow noopener noreferrer">
          <img
            alt="Zysk Technologies"
            className="lazy"
            src={zyskImage.placeholder || zyskImage.src}
            data-srcset={zyskImage.srcSet}
            data-sizes="(max-width: 768px) 220px, 300px"
          />
        </a>
        <a
          href="https://client.outreachcircle.com/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <img
            alt="OutreachCircle"
            className="lazy"
            src={outreachcircleImage.placeholder || outreachcircleImage.src}
            data-srcset={outreachcircleImage.srcSet}
            data-sizes="(max-width: 768px) 220px, 300px"
          />
        </a>
        <a
          href="https://www.geektrust.in/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <img
            alt="Geektrust"
            className="lazy"
            src={geektrustImage.placeholder || geektrustImage.src}
            data-srcset={geektrustImage.srcSet}
            data-sizes="(max-width: 768px) 220px, 300px"
          />
        </a>
        <a
          href="https://www.pickcel.com/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <img
            alt="Pickcel"
            className="lazy"
            src={pickcelImage.placeholder || pickcelImage.src}
            data-srcset={pickcelImage.srcSet}
            data-sizes="(max-width: 768px) 220px, 300px"
          />
        </a>
      </ClientsGallery>
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

  & .nocontact {
    color: ${theme.colors.red};
    padding: 4em 1em 5em 1em;
  }

  & .contact {
    padding: 1em 0 6em 0;
    font-size: 0.85em;
  }

  & .contact .contact-para {
    padding-bottom: 2em;
  }

  & .contact .form {
    max-width: 33em;
    margin: 0 auto;
    font-size: 0.9em;
  }

  & .contact label {
    display: block;
    margin-bottom: 0.5em;
  }

  & .contact input,
  & .contact textarea,
  & .contact button {
    font-size: 1em;
    display: block;
    width: 100%;
    border: none;
    outline: none;
    padding: 0.4em;
    margin-bottom: 1.5em;
    border-radius: 0.25em;
    line-height: 1.5;
    font-family: inherit;
  }

  & .contact button {
    background-color: ${theme.colors.primary};
    margin: 2em auto;
    width: 75%;
    transition: 0.1s;
  }

  & .contact button.disabled {
    background-color: ${theme.colors.gray};
    cursor: default;
  }

  & .contact button:hover {
    background-color: ${theme.colors.darkAccent};
  }

  & .contact button:active {
    background-color: ${theme.colors.darkAlternate};
  }

  & .contact .recaptcha-disclaimer {
    font-size: 0.8em;
    text-align: center;
  }

  & .contact .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    padding: 1em 2em;
    position: fixed;
    width: 100%;
    bottom: -10em;
    right: 0;
    transition: 0.25s ease;
    z-index: 1;
  }

  & .contact .info.visible {
    bottom: 0;
  }

  & .contact .info.success {
    background-color: ${theme.colors.green};
  }

  & .contact .info.failure {
    background-color: ${theme.colors.red};
  }

  & .contact .info-text {
    flex: 1;
    text-align: center;
    margin-left: calc(1em + 24px);
  }

  & .contact .info-cross {
    height: 24px;
    width: 24px;
    cursor: pointer;
  }

  .dark & .contact input,
  .dark & .contact textarea {
    background-color: ${theme.colors.darkest};
    color: ${theme.colors.light};
  }

  .dark & .contact button {
    color: ${theme.colors.darkest};
  }

  .light & .contact input,
  .light & .contact textarea {
    background-color: ${theme.colors.lightest};
    color: ${theme.colors.dark};
  }

  .light & .contact button {
    color: ${theme.colors.lightest};
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

const ClientsPara = styled.div`
  text-align: center;
`;

const ClientsGallery = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  gap: 2em;
  margin: 2.5em auto;
  width: max-content;

  & img {
    width: 300px;
    height: 100.5px;
    border-radius: 0.2em;
    filter: grayscale(100%);
    transition: 0.2s ease;
  }

  & img:hover {
    filter: grayscale(0);
  }

  .dark & img {
    box-shadow: 0 0 20px 0 #000000;
  }

  .light & img {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    grid-template-columns: 220px;

    & img {
      width: 220px;
      height: 73px;
    }
  }
`;

export const getStaticProps = async () => {
  const { config, fontFaces } = await commonExtractor();
  return {
    props: {
      config,
      fontFaces
    }
  };
};

export default Hire;
