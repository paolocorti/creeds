const HowToRead = ({ setHowToReadOpen, readOpen, text, image }) => {
  return (
    <div
      className={`w-full md:w-4/5 bg-lightgreen p-8 absolute z-50 h-full overflow-y-auto overflow ${
        readOpen ? "left-0" : "-left-full"
      } transition-all duration-500	`}
    >
      <div className="flex w-full justify-between">
        <h2 className="subtitle">How to read the graphic</h2>
        <div>
          <div
            className="border rounded-2xl w-24 z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-green"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              lineHeight: 1.5,
            }}
            onClick={() => setHowToReadOpen((open) => !open)}
          >
            CLOSE X
          </div>
        </div>
      </div>
      <p className="px-0" dangerouslySetInnerHTML={{ __html: text }}></p>
      <img src={image} className="w-full md:w-2/3 mt-8" width={600} />
    </div>
  );
};

export default HowToRead;
