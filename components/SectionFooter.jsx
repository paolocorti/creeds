import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "./Button";
import {
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareButton,
} from "react-share";

const SectionFooter = ({
  link,
  homeCallback,
  previousChapter,
  nextChapter,
  shared,
  shareUrl,
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full justify-center relative items-start md:items-center mt-2">
      {!shared && (
        <div
          className="md:absolute left-0 cursor-pointer"
          //data-tip="Copy link to embed"
        >
          <div className="flex justify-start px-0">
            <FacebookShareButton
              url={shareUrl}
              title={
                "Energy demand flexibility and the rhythms of everyday life"
              }
              summary={
                "Our everyday life – what we do at home, at work, at school, when moving around – and its relation to energy demand is rather complex. As part of our work as energy researchers, we have introduced fresh approaches to thinking about the social-temporal organisation of energy demand."
              }
              source={shareUrl}
            >
              <img src="/share-facebook.svg" width={28} className="mr-1" />
            </FacebookShareButton>
            <LinkedinShareButton
              url={shareUrl}
              title={
                "Energy demand flexibility and the rhythms of everyday life"
              }
              summary={
                "Our everyday life – what we do at home, at work, at school, when moving around – and its relation to energy demand is rather complex. As part of our work as energy researchers, we have introduced fresh approaches to thinking about the social-temporal organisation of energy demand."
              }
              source={shareUrl}
            >
              <img src="/share-linkedin.svg" width={28} className="mr-1" />
            </LinkedinShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={
                "Energy demand flexibility and the rhythms of everyday life"
              }
              summary={
                "Our everyday life – what we do at home, at work, at school, when moving around – and its relation to energy demand is rather complex. As part of our work as energy researchers, we have introduced fresh approaches to thinking about the social-temporal organisation of energy demand."
              }
              source={shareUrl}
            >
              <img src="/share-tw.svg" width={28} className="ml-1" />
            </TwitterShareButton>
            <a
              href={`mailto:?subject=Energy demand Flexibility Visualisations Website&amp;body=The aim of this project was to provide you with accessible, user-friendly visualisations that show the ways in which our activities impact our energy demands. These visualisations condense a wealth of data from a variety of sources into a single graphic that allows you to explore how our everyday lives unfold over the course of a day, and what impacts they have on the amount of energy required to provide us with the services we have become used to have access to. More importantly, the visuals also show us the opportunities for shifting those energy- intensive activities away from those busy periods of the day and into those periods where there is potential to be more flexible, thus reducing the strain on out power systems. ${shareUrl}`}
              label="Share via e-mail"
            >
              <img src="/share-mail.svg" width={28} className="ml-1" />
            </a>
            <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
              {copied ? (
                <div className="flex justify-start md:justify-center">
                  <div
                    className="border rounded-2xl z-40 px-4 py-1 cursor-pointer bg-black text-pink"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      lineHeight: 1.5,
                    }}
                  >
                    COPIED CODE
                  </div>
                </div>
              ) : (
                <div className="flex justify-start md:justify-center">
                  <div
                    className="border rounded-2xl z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-pink"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      lineHeight: 1.5,
                    }}
                  >
                    COPY EMBED CODE
                  </div>
                </div>
              )}
            </CopyToClipboard>
          </div>
        </div>
      )}
      {shared && (
        <div className="mr-2">
          <Button title="GO TO WEBSITE" callback={homeCallback} />
        </div>
      )}
      {previousChapter && !shared && (
        <div className="mr-2">
          <Button title="PREVIOUS CHAPTER ↑" callback={previousChapter} />
        </div>
      )}
      {nextChapter && !shared && (
        <div className="md:ml-2 mt-4 md:mt-0">
          <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
        </div>
      )}
    </div>
  );
};

export default SectionFooter;
