const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <div className=" flex h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800 ">
      {children}
    </div>
  );
};
export default AuthLayout;
