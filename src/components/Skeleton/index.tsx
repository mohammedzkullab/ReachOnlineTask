import type { SkeletonType } from "components/types";

const arrayCreator = (numberOfElements: number) => {
  let arr = [];
  for (let i = 0; i < numberOfElements; i++) {
    arr.push("");
  }
  return arr;
};
export const Skeleton: SkeletonType = ({
  width,
  height = 16,
  variant = "rounded",
  className,
  style,
  numberOfLoaders = 1,
  ...rest
}) => {
  const loaders = arrayCreator(numberOfLoaders);
  let SkeletonClassName = `block bg-gray-200 animate-pulse ${className ?? ""}`;
  if (variant === "rounded") {
    SkeletonClassName += " rounded";
  } else if (variant === "circular") {
    SkeletonClassName += " rounded-full";
  }

  return (
    <div className="flex flex-col h-full gap-3">
      {loaders.map((item, index) => (
        <span
          key={index}
          className={SkeletonClassName}
          style={{
            width: width ? width + "px" : undefined,
            height: height + "px",
            ...style,
          }}
          {...rest}
        />
      ))}
    </div>
  );
};

export default Skeleton;
