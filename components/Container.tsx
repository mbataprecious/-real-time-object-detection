interface Props extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
  className?: string;
}

export function Container({ className, ...props }: Props) {
  return (
    <div
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className || ""}`}
      {...props}
    />
  );
}
