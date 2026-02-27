import Hero from '../features/Hero/Hero.jsx';
import Services from '../features/Services/Services.jsx';
import Products from '../features/Products/Products.jsx';
import WhyUs from '../features/WhyUs/WhyUs.jsx';
import Contact from '../features/Contact/Contact.jsx';

const Home = () => {
    return (
        <main>
            <Hero />
            <Products />
            <Services />
            <WhyUs />
            <Contact />
        </main>
    );
};

export default Home;
