import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import customStyle from "@/styles/syntax-highlighter.customStyle";
import SyntaxHighlighter from "react-syntax-highlighter";

interface CodeBlockInterface {
  language: string;
  children: string | string[];
}

const CodeBlock = ({ language, children }: CodeBlockInterface) => {
  let sample: string = "";

  if (!Array.isArray(children) && typeof children === "string") {
    sample = children;
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      sample += child;
    });
  }

  return (
    <SyntaxHighlighter
      wrapLines
      customStyle={customStyle}
      language={language}
      style={atomOneDark}
    >
      {sample}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
