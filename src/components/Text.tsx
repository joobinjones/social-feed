interface ITextProps {
  children: any;
  fontSize?: string;
  fontWeight?: number;
  color?: string;
  ml?: string;
  mb?: string;
  mt?: string;
  mr?: string;
}

const Text = ({
  children,
  color = "black",
  fontSize = "12px",
  fontWeight = 400,
  ml = "0",
  mb = "0",
  mt = "0",
  mr = "0",
}: ITextProps): JSX.Element => {
  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        margin: `${mt} ${mr} ${mb} ${ml}`,
      }}
    >
      {children}
    </div>
  );
};

export default Text;
