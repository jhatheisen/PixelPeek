const Footer = () => {
  const footer_apps = [
    "Created By :",
    "Jeff L",
    "Jonathan L",
    "Jhass T",
    "Shana E",
  ];

  return (
    <div className="SplashPage-Footer">
      {footer_apps.map((app) => {
        return (
          <div className="SplashPage-Footer-Text" key={app}>
            {app}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
