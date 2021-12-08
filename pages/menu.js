import styled from 'styled-components';
import Layout from '../components/Layout';
import MenuContent from '../components/MenuContent';
import { commonExtractor } from '../extractors';

const Menu = ({ config, fontFaces }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: 'Site map' }}>
    <MenuPage>
      <MenuContent />
    </MenuPage>
  </Layout>
);

const MenuPage = styled.div`
  font-size: 1.35em;
  text-align: center;
  padding-top: 1em;
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

export default Menu;
