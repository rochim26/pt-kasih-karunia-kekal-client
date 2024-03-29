import { NextSeo } from "next-seo";
import { clientAxios, baseURL } from "../../client";
import Lightbox from "react-image-lightbox";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
const numeral = require("numeral");
try {
  numeral.register("locale", "id", {
    delimiters: {
      thousands: ".",
      decimal: ",",
    },
    abbreviations: {
      thousand: "ribu",
      million: "juta",
      billion: "miliar",
      trillion: "triliun",
    },
    currency: {
      symbol: "Rp",
    },
  });

  numeral.locale("id");
} catch (err) {
  console.log(err);
}

function Movie({ product, offices }) {
  const SEO = {
    title: `PT. ZZF Industri Indonesia | ${product.nama}`,
    description: product.deskripsi_singkat,

    openGraph: {
      title: `PT. ZZF Industri Indonesia | ${product.nama}`,
      description: product.deskripsi_singkat,
    },
  };

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  console.log(product);

  return (
    <>
      <NextSeo {...SEO} />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div
                  id={`carousel${product.id}`}
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    {product.gallery.map((gallery, idx) => {
                      return (
                        <div
                          className={
                            idx == 0 ? "carousel-item active" : "carousel-item"
                          }
                          key={gallery.id}
                        >
                          <img
                            onClick={() => setIsOpen(true)}
                            src={baseURL + gallery.url}
                            className="d-block w-100 square-img pointer"
                            alt={gallery.name}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <a
                    className="carousel-control-prev"
                    href={`#carousel${product.id}`}
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href={`#carousel${product.id}`}
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
                {isOpen && (
                  <Lightbox
                    mainSrc={baseURL + product.gallery[photoIndex].url}
                    nextSrc={
                      baseURL +
                      product.gallery[(photoIndex + 1) % product.gallery.length]
                        .url
                    }
                    prevSrc={
                      baseURL +
                      product.gallery[
                        (photoIndex + product.gallery.length - 1) %
                          product.gallery.length
                      ].url
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                      setPhotoIndex(
                        (photoIndex + product.gallery.length - 1) %
                          product.gallery.length
                      )
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex((photoIndex + 1) % product.gallery.length)
                    }
                  />
                )}
              </div>
              <div className="col-md-6 mb-4">
                <h1 className="h5 font-weight-bold text-dark">
                  {product.nama}
                </h1>
                <p>{product.deskripsi_singkat}</p>
                {product.dokumen ? (
                  <a
                    href={baseURL + product.dokumen.url}
                    className="mb-4 badge badge-danger"
                    target="_blank"
                  >
                    Dokumen: {product.dokumen.name}
                  </a>
                ) : (
                  ""
                )}
                {/* {product.diskon > 0 ? (
                  <>
                    <h5>
                      Rp
                      {numeral(
                        product.harga * ((100 - product.diskon) / 100)
                      ).format("0,0")}
                    </h5>
                    <div>
                      <del className="text-secondary">
                        {numeral(product.harga).format("0,0")}
                      </del>{" "}
                      <span className="text-danger">-{product.diskon}%</span>
                    </div>
                  </>
                ) : (
                  <h5>Rp{numeral(product.harga).format("0,0")}</h5>
                )} */}
                <a
                  href={`https://api.whatsapp.com/send?phone=62818961343&text=${"Halo Admin PT. ZZF Industri Indonesia, saya ingin membeli produk "}${
                    product.nama
                  }`}
                  className="btn btn-danger d-block mt-4 py-2"
                >
                  <i className="fab fa-whatsapp mr-2"></i>Beli via Whatsapp
                </a>
              </div>
              <div className="col-md-12 mb-4">
                <div className="card">
                  <div className="card-header text-dark font-weight-bold">
                    Deskripsi {product.nama}
                  </div>
                  <div className="card-body">
                    {product.zzf_produk_kategori ? (
                      <a
                        href="#!"
                        className="badge badge-secondary d-inline-block mb-4"
                      >
                        {product.zzf_produk_kategori.nama}
                      </a>
                    ) : null}
                    <div className="content">
                      <ReactMarkdown
                        source={
                          product.deskripsi
                            ? product.deskripsi.replace(
                                "/uploads",
                                "http://128.199.182.224:1337/uploads"
                              )
                            : null
                        }
                      />
                    </div>
                    {/* <p>Kategori:</p> */}
                    {/* {product.zzf_produk_kategori?.map((category) => {
                      return (
                        <Link
                          href="/produk/kategori/[slug]"
                          as={`/produk/kategori/${category.slug}`}
                          key={category.id}
                        >
                          <a>
                            <h4 className="badge badge-warning mr-1">
                              {category.nama}
                            </h4>
                          </a>
                        </Link>
                      );
                    })} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="card">
              <div className="card-header">Butuh bantuan? Hubungi:</div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {offices.map((office) => {
                    if (office.telepon) {
                      return (
                        <li className="list-group-item" key={office.id}>
                          <i className="fas fa-phone mr-2"></i>
                          {office.telepon}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div> */}
        </div>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <h6 className="mb-2 font-weight-bold">
              Jual {product.nama} terbaik
            </h6>
            <p className="small">
              PT. ZZF Industri Indonesia merupakan distributor alat kesehatan
              terpercaya dalam menjual {product.nama}. PT. ZZF Industri
              Indonesia telah berpengalaman dalam membantu pelanggan dan
              konsumen memilih {product.nama} terbaik.
            </p>
            <p className="small">
              Anda dapat membandingkan harga {product.nama} dengan cepat dan
              mudah, dan dapat menemukan spesifikasi {product.nama} seperti
              warna, ukuran, atau spesifikasi lainnya. PT. ZZF Industri
              Indonesia membantu pengunjung untuk menemukan produk popular dan
              unggulan dengan daftar {product.nama} yang paling banyak dilihat
              pengunjung serta
              {product.nama} yang paling banyak dibeli.
            </p>
            <p className="small">
              {product.nama} yang Anda beli di PT. ZZF Industri Indonesia
              merupakan produk original dengan kualitas terjamin. PT. ZZF
              Industri Indonesia memastikan konsumen hanya menerima{" "}
              {product.nama}
              asli.
            </p>
            <p className="small">
              Belanja online di PT. ZZF Industri Indonesia semakin aman dan
              mudah karena langsung terhubung ke kontak Whatsapp PT. ZZF
              Industri Indonesia. Tidak perlu takut untuk beli
              {product.nama} dan melakukan pembayaran, karena semua komunikasi
              di PT. ZZF Industri Indonesia dienkripsi dengan teknologi SSL.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h6 className="mb-2 font-weight-bold">
              Belanja {product.nama} murah
            </h6>
            <p className="small">
              PT. ZZF Industri Indonesia jual {product.nama} memberikan
              penawaran menarik setiap harinya, seperti diskon, potongan harga
              melalui coupon atau voucher yang dapat ditukarkan pada saat
              checkout. PT. ZZF Industri Indonesia menjual {product.nama} dengan
              harga yang murah namun bersaing dan berkualitas.
            </p>
            <p className="small">
              Dapatkan daftar dan perbandingan harga {product.nama}
              rmurah hanya di PT. ZZF Industri Indonesia. Tidak hanya{" "}
              {product.nama}, Anda dapat menemukan variasi dan produk dengan
              harga murah dan harga terbaik lainnya di PT. ZZF Industri
              Indonesia. {product.nama}
              dapat dibeli di PT. ZZF Industri Indonesia dengan harga murah dan
              berkualitas dengan garansi asli.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h6 className="mb-2 font-weight-bold">
              Beli {product.nama} terbaru
            </h6>
            <p className="small">
              Dapatkan dan beli {product.nama} terbaru di PT. ZZF Industri
              Indonesia{product.nama} merupakan pilihan yang tepat untuk anda,
              baik untuk pribadi ataupun bisnis. Untuk membeli {product.nama}{" "}
              terbaru, Anda tidak perlu mengunjungi toko atau khawatir bagaimana
              membawa pulang produk pesanan anda dengan aman, karena tim kami
              akan mengantarkan produk yang anda pilih ke lokasi tujuan.
            </p>
            <p className="small">
              Belanja online di PT. ZZF Industri Indonesia semakin murah karena
              sering ada promo yang dapat diikuti oleh semua member PT. ZZF
              Industri Indonesia. Segera miliki {product.nama} termurah dan
              terbaru hanya di PT. ZZF Industri Indonesia.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await clientAxios(`/zzf-produks?slug=${slug}`);
  // const offices = await clientAxios("/offices");

  return {
    props: {
      product: res.data[0] || null,
      // offices: offices.data,
    },
  };
}

export default Movie;
