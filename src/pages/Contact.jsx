import SectionHead from "../components/common/SectionHead";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import Footer from "../components/layout/Footer";

export default function Contact({ id }) {
  return (
    <section id={id} className="section contact">
      <SectionHead kicker="06 · Say hello" title="Get in touch" />
      <div className="ct-grid">
        <ContactInfo />
        <ContactForm />
      </div>
      <Footer />
    </section>
  );
}
