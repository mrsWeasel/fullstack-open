interface Props {
  heading: string;
}

const Header: React.FC<Props> = ({ heading }) => {
  return <h1>{heading}</h1>;
};

export default Header;
