const Footer = () => {
  return (
    <footer className="sticky-footer bg-white">
      <div className="container d-flex justify-content-between my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright © IMS {new Date().getFullYear()} | Version 0.1.0.0 Beta</span>
        </div>
          <div className="copyright text-center mt-1 text-primary">
              <span>Design & Developed By Isuru Jayawickrama</span>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
