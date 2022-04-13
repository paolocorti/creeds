const Button = ({ title, callback, bold = false }) => {
  return (
    <div className="flex justify-start md:justify-center">
      <div
        className="border rounded-2xl z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-pink"
        style={{
          fontSize: "12px",
          fontWeight: bold ? "bold" : "regular",
          lineHeight: 1.5,
        }}
        onClick={callback}
      >
        {title}
      </div>
    </div>
  );
};
export default Button;
