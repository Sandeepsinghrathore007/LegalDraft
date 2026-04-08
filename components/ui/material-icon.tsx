import type { CSSProperties } from "react";

type MaterialIconProps = {
  icon: string;
  className?: string;
  fill?: boolean;
  style?: CSSProperties;
};

export function MaterialIcon({
  icon,
  className = "",
  fill = false,
  style
}: MaterialIconProps) {
  const mergedStyle = fill
    ? {
        fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        ...style
      }
    : style;

  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`.trim()}
      style={mergedStyle}
    >
      {icon}
    </span>
  );
}
