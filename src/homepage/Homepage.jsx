import Footer from '@edx/frontend-component-footer';
import HeaderContent from './header-content/HeaderContent';
import BodyContent from './body-content/BodyContent';
// import FooterContent from './footer-content/FooterContent';

const Homepage = () => (
  <main>
    <HeaderContent />
    <BodyContent />
    <Footer />
    {/* <FooterContent /> */}
  </main>
);

export default Homepage;
