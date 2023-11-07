import scss from "./footer.module.scss";

const Footer = () => {
  return (
    <header className={scss.root}>
      <p>
        &copy; INDUSTRIAL AI RESEARCH LAB - Anastasiia Tsibernaia,{" "}
        {new Date().getFullYear()}
      </p>
    </header>
  );
};

export default Footer;
