import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "./Button";

const SectionFooter = ({ link, previousChapter, nextChapter }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full justify-center relative items-center mt-2">
      <div
        className="absolute left-0 cursor-pointer"
        data-tip="Copy link to embed"
      >
        <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
          {copied ? (
            <img
              src={"share-link-active.svg"}
              className="cursor-pointer"
              width={30}
            />
          ) : (
            <img src={"share-link.svg"} className="cursor-pointer" width={30} />
          )}
        </CopyToClipboard>
      </div>
      {previousChapter && (
        <div className="mr-2">
          <Button title="PREVIOUS CHAPTER ↑" callback={previousChapter} />
        </div>
      )}
      {nextChapter && (
        <div className="ml-2 mt-4 md:mt-0">
          <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
        </div>
      )}
    </div>
  );
};

export default SectionFooter;
