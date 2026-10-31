import { useEffect, useState } from "react";

export default function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del && text === word) return setDel(true);
        if (del && text === "") {
          setDel(false);
          return setI((v) => v + 1);
        }
        setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      !del && text === word ? 1600 : del ? 35 : 70
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return (
    <span className="typer">
      {text}
      <span className="caret">|</span>
    </span>
  );
}
