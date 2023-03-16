const Footer = () => {
  const footer_apps = [
    "Jeff L",
    "Jonathan L",
    "Jhass T",
    "Shana E",
  ];

  return (
    <div className="SplashPage-Footer">
      {/* {footer_apps.map((app) => {
        return (
          <div className="SplashPage-Footer-Text" key={app}>
            {app}
          </div>
        );
      })} */}
      <div className="creator-container">
        <p className="SplashPage-Footer-Text">Jeff L</p>
        <a target="_blank" href="https://github.com/jeffliu007"><i class="fa-brands fa-github fa-xl"></i></a>
        <a target="_blank" href="https://www.linkedin.com/in/jeffreyliu17/"><i class="fa-brands fa-linkedin fa-xl"></i></a>
      </div>
      <div className="creator-container">
        <p className="SplashPage-Footer-Text">Jonathan L</p>
        <a target="_blank" href="https://github.com/jlin231"><i class="fa-brands fa-github fa-xl"></i></a>
        <a target="_blank" href="https://www.linkedin.com/in/jonathan-lin-a71088158/"><i class="fa-brands fa-linkedin fa-xl"></i></a>
      </div>
      <div className="creator-container">
        <p className="SplashPage-Footer-Text">Jhass T</p>
        <a target="_blank" href="https://github.com/jhatheisen"><i class="fa-brands fa-github fa-xl"></i></a>
        <a target="_blank" href="https://www.linkedin.com/in/jhass-theisen-a92863202/"><i class="fa-brands fa-linkedin fa-xl"></i></a>
      </div>
      <div className="creator-container">
        <p className="SplashPage-Footer-Text">Shana E</p>
        <a target="_blank" href="https://github.com/snowywombat"><i class="fa-brands fa-github fa-xl"></i></a>
        <a target="_blank" href="https://www.linkedin.com/in/shana-edouard/"><i class="fa-brands fa-linkedin fa-xl"></i></a>
      </div>
    </div>
  );
};


export default Footer;
