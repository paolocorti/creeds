export default function Home() {
  return (
    <div style={{ width: "1200px" }}>
      <div
        dangerouslySetInnerHTML={{
          __html: `<div style="padding:65.25% 0 0 0;position:relative;"><iframe src="http://localhost:3000/activities" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="http://localhost:3000/activities"></iframe></div>`,
        }}
      ></div>
    </div>
  );
}
