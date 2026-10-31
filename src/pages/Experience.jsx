import SectionHead from "../components/common/SectionHead";
import JobCard from "../components/experience/JobCard";
import { experience } from "../data";

export default function Experience({ id }) {
  return (
    <section id={id} className="section">
      <SectionHead kicker="02 · Work history" title="Experience" />
      <div className="exp-list">
        {experience.map((job, i) => (
          <JobCard key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
