import {
  siReact, siTypescript, siNextdotjs, siJavascript, siRedux, siTailwindcss, siMui, siSass, siBootstrap, siHtml5, siCss3,
  siNodedotjs, siExpress, siDotnet, siRabbitmq, siSocketdotio, siStripe, siOpenjdk,
  siPostgresql, siSupabase, siMongodb, siFirebase, siPrisma, siCloudinary, siAmazonwebservices,
  siGit, siGithub, siGithubactions, siBitbucket, siDocker, siPostman, siSwagger,
  siLinkedin, siLeetcode, siHackerrank, siInstagram,
  siExpo, siVite, siGooglegemini, siOpenai, siClaude, siRazorpay, siReactquery, siPython, siFastapi, siMysql, siGooglechrome,
} from "simple-icons";

// Skill / social name → brand icon. Skills without a brand icon get a text monogram instead.
const map = {
  "React.js": siReact, TypeScript: siTypescript, "Next.js": siNextdotjs, JavaScript: siJavascript, Redux: siRedux,
  "Tailwind CSS": siTailwindcss, "Material UI": siMui, Sass: siSass, Bootstrap: siBootstrap, HTML: siHtml5, CSS: siCss3,
  "Node.js": siNodedotjs, "Express.js": siExpress, ".NET 8": siDotnet, "ASP.NET Core": siDotnet, RabbitMQ: siRabbitmq,
  "Socket.IO": siSocketdotio, Stripe: siStripe, Java: siOpenjdk,
  PostgreSQL: siPostgresql, Supabase: siSupabase, MongoDB: siMongodb, Firebase: siFirebase, Prisma: siPrisma,
  Cloudinary: siCloudinary, AWS: siAmazonwebservices,
  Git: siGit, GitHub: siGithub, "GitHub Actions": siGithubactions, Bitbucket: siBitbucket, Docker: siDocker,
  Postman: siPostman, Swagger: siSwagger,
  LinkedIn: siLinkedin, LeetCode: siLeetcode, HackerRank: siHackerrank, Instagram: siInstagram,
  "React Native": siReact, Expo: siExpo, Vite: siVite, "Google Gemini": siGooglegemini, OpenAI: siOpenai, Claude: siClaude,
  Razorpay: siRazorpay, "TanStack Query": siReactquery, Python: siPython, FastAPI: siFastapi, MySQL: siMysql,
  "Chrome Extension": siGooglechrome,
};

// Dark logos get a light colour so they stay visible on the space background.
const LIGHT = "var(--text)";
const fallbackColors = { "C#": "#9b4f96", Azure: "#0078d4", "Azure Blob Storage": "#0078d4", "VS Code": "#2f9df4", "REST APIs": "#5eead4", Serilog: "#c084fc" };

function brightness(hex) {
  const n = parseInt(hex, 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000;
}

export function getIcon(name) {
  const icon = map[name];
  if (!icon) {
    const letters = name.replace(/[^A-Za-z#]/g, "").slice(0, name.includes(" ") ? 2 : 3);
    const short = name === "C#" ? "C#" : name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || letters;
    return { path: null, color: fallbackColors[name] || "#a78bfa", short };
  }
  const color = brightness(icon.hex) < 60 ? LIGHT : `#${icon.hex}`;
  return { path: icon.path, color };
}

export function SkillIcon({ name, size = 28 }) {
  const ic = getIcon(name);
  if (!ic.path) {
    return (
      <span className="mono-icon" style={{ width: size, height: size, color: ic.color, borderColor: ic.color, fontSize: size * 0.38 }}>
        {ic.short}
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={ic.color} aria-hidden="true">
      <path d={ic.path} />
    </svg>
  );
}
