import Layout from '../components/Layout';
import { commonExtractor } from '../extractors';

const Home = ({ config, fontFaces }) => (
  <Layout config={config} fontFaces={fontFaces}>
    Temporarily down due to maintenance
  </Layout>
);

export const getStaticProps = async (context) => {
  const { config, fontFaces } = await commonExtractor();
  return {
    props: {
      config,
      fontFaces
    }
  };
};

export default Home;
