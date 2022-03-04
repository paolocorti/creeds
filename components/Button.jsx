const Button = ({ title, callback }) => {
  return (
    <div className="flex justify-center">
      <div
        className="border rounded-2xl z-40 px-4 py-1 cursor-pointer hover:bg-black hover:text-pink"
        style={{
          fontSize: "12px",
        }}
        onClick={callback}
      >
        {title}
      </div>
    </div>
  );
};
export default Button;
