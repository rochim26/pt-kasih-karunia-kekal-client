import Link from "next/link";

const Navigation = () => {
  return (
    <header>
      <div className="bg-primary py-2">
        <div className="container clearfix">
          <div id="google_translate_element" className="float-left"></div>
          <a
            className="text-white float-right ml-4"
            href="mailto:info@kasihkaruniakekalpt.com"
          >
            <i className="fas fa-envelope mr-2"></i>info@kasihkaruniakekalpt.com
          </a>
          <a className="text-white float-right" href="tel:+622142879526">
            <i className="fas fa-phone mr-2"></i>+62 21-42879526
          </a>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand font-weight-bold">
              <img
                src="/img/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top mr-2"
                alt="PT Kasih Karunia Kekal"
                loading="lazy"
              />
              <span className="d-none d-sm-inline">PT Kasih Karunia Kekal</span>
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link">Beranda</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/profil">
                  <a className="nav-link">Profil</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/produk">
                  <a className="nav-link">Produk</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/kontak">
                  <a className="nav-link">Kontak</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blog">
                  <a className="nav-link">Blog</a>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link btn orange px-4 text-white font-weight-bold"
                  href={`https://api.whatsapp.com/send?phone=628121103829&text=${"Halo Admin PT Kasih Karunia Kekal"}`}
                >
                  FREE Whatsapp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
