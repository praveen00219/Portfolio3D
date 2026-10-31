import SectionHead from "../components/common/SectionHead";
import { EduFeatured, EduCard } from "../components/education/EduCards";
import CertDeck from "../components/education/CertDeck";
import { education } from "../data";

export default function Education({ id }) {
  const [feat, ...degrees] = education;
  return (
    <section id={id} className="section">
      <SectionHead kicker="05 · Learning journey" title="Education" />
      <div className="edu-split">
        <div className="edu-left">
          <h4 className="col-head">Education</h4>
          <EduFeatured edu={feat} />
          <div className="edu-grid">
            {degrees.map((d, i) => (
              <EduCard key={d.title} edu={d} index={i + 1} />
            ))}
          </div>
        </div>

        <div className="edu-right">
          <h4 className="col-head">
            Certificates
          </h4>
          <CertDeck />
        </div>
      </div>
    </section>
  );
}
