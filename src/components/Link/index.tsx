type LinkType = {
  children: React.ReactNode;
  href: string;
  className?: string;
};
const Link = ({ children, href, className, ...rest }: LinkType) => {
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
};

export default Link;
