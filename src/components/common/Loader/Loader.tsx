import { FC } from "react";
import ClipLoader from "react-spinners/ClipLoader";

type LoaderProps = {
  color?: string;
  size?: number;
  cssOverride?: object;
  ariaLabel?: string;
};

const override = {
  display: "block",
  margin: "100px auto",
};

const Loader: FC<LoaderProps> = ({
  color = "#000",
  size = 150,
  cssOverride,
  ariaLabel = "Loading Spinner",
}) => {
  return (
    <ClipLoader
      color={color}
      loading={true}
      cssOverride={cssOverride ?? override}
      size={size}
      aria-label={ariaLabel}
    />
  );
};

export default Loader;
