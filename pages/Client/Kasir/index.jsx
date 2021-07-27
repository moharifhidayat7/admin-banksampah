import Card from "../../../components/Card";
import { useState, useEffect } from "react";
import NavbarProduk from "../../../components/Navbar/NavbarProduk";
import * as Smooth from "react-scroll";
import * as Icon from "heroicons-react";
import BayarModal from "../../../components/Modals/BayarModal";

const ItemKeranjang = ({ item, formatRp, keranjang, setKeranjang }) => {
  const [qty, setQty] = useState(1);

  const updateQty = (item) => {
    if (qty == 0) {
      return;
    }

    const newArr = [];
    for (let i = 0; i < keranjang.length; i++) {
      if (keranjang[i]._product._id == item._product._id) {
        newArr.push({ ...keranjang[i], qty: qty });
      } else {
        newArr.push(keranjang[i]);
      }
    }
    setKeranjang(newArr);
  };

  useEffect(() => {
    updateQty(item);
  }, [qty]);

  return (
    <div className='flex justify-between'>
      <div>
        <p>{item._product.name}</p>
        <div>
          <button
            className='px-2 bg-red-500 text-white'
            onClick={(e) => {
              e.preventDefault();
              if (qty != 0) {
                setQty(qty - 1);
              } else {
                setKeranjang(keranjang.filter((i) => i._id != item._id));
              }
            }}
          >
            -
          </button>
          <input
            className='lg:w-10 xl:24 text-center focus:outline-none'
            placeholder='0'
            type='number'
            min='0'
            max={item._product.stock}
            value={qty}
            onChange={(e) => {
              if (e.target.value > item._product.stock) {
                setQty(item._product.stock);
              } else {
                setQty(parseInt(e.target.value));
              }
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (qty < item._product.stock) {
                setQty(qty + 1);
              }
            }}
            className='px-2 bg-green-500 text-white'
          >
            +
          </button>
        </div>
      </div>
      <div className='place-self-center'>
        {formatRp(qty * item._product.price)}
      </div>
    </div>
  );
};

export default function index({ productCategory }) {
  const [keranjang, setKeranjang] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const formatRp = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const [bt, setBt] = useState("hidden");
  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      if (window.scrollY >= 160) {
        setBt("");
      } else {
        setBt("hidden");
      }
    });
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const getProduct = async (keyword = "", category = "") => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/product?keyword=${keyword}&_category=${category}`
    );
    const products = await res.json();

    setProducts(products.results);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <BayarModal
        modal={modal}
        toggleModal={toggleModal}
        keranjang={keranjang}
        setKeranjang={setKeranjang}
        formatRp={formatRp}
      />
      <NavbarProduk productCategory={productCategory} />
      <Smooth.Link smooth to='home'>
        <button
          className={`z-50 bg-blue-800  font-bold bg-opacity-30 w-10 p-2 fixed left-4 bottom-4 rounded-md ${bt} `}
        >
          <Icon.Home />
        </button>
      </Smooth.Link>

      <div className='grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-2 lg:gap-10 mx-14 mb-4'>
        <div className='md:col-span-2 space-y-4'>
          <div className='flex justify-between items-center top-0 sticky bg-white  border-b border-gray-300 p-2 z-10 mt-4'>
            <div className='uppercase text-center text-lg   font-medium text-gray-500'>
              Produk
            </div>
            <div className='flex lg:w-1/2 justify-between space-x-2'>
              <input
                placeholder='Cari Produk'
                type='search'
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  getProduct(e.target.value, category);
                }}
                className='border hidden lg:block p-1 w-4/5 focus:outline-none'
              />
              <select
                name='kategori'
                className='lg:p-1 lg:px-4 border focus:outline-none'
                defaultValue=''
                onChange={(e) => {
                  setCategory(e.target.value);
                  getProduct(searchKeyword, e.target.value);
                }}
              >
                <option value=''>Semua Produk</option>
                {productCategory.results.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='grid lg:grid-cols-4 gap-2'>
            {products
              .filter((p) => p.stock != 0)
              .map((product) => {
                return (
                  <Card
                    key={product._id}
                    img={`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads/${product._picture}`}
                    data={product}
                    keranjang={keranjang}
                    setKeranjang={setKeranjang}
                    formatRp={formatRp}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className='lg:w-96 mx-14 lg:mx-0 lg:fixed lg:right-14 lg:top-28'>
        <div className='text-lg mt-4 flex shadow justify-between bg-white font-medium text-gray-500 border-b border-gray-300 p-2'>
          <div>Keranjang</div>
          <button
            onClick={() => setKeranjang([])}
            className='float-right text-white px-2 py-1 block bg-red-500 hover:bg-red-800 text-xs rounded-lg focus:outline-none'
          >
            Kosongkan
          </button>
        </div>
        <div className='bg-white p-2 px-4'>
          <div className='h-80 max-h-full overflow-y-auto'>
            {keranjang.map((item, index) => {
              return (
                <div key={item._product._id}>
                  <ItemKeranjang
                    item={item}
                    formatRp={formatRp}
                    keranjang={keranjang}
                    setKeranjang={setKeranjang}
                  />
                  <hr className='my-2' />
                </div>
              );
            })}
          </div>
          <hr />
          <div className='my-4 font-semibold'>
            <div className='flex justify-between'>
              <p>Total Harga</p>
              <p>
                {formatRp(
                  keranjang.reduce((tot, item) => {
                    if (keranjang.length == 0) {
                      return 0;
                    }
                    return tot + item._product.price * item.qty;
                  }, 0)
                )}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (keranjang.length > 0) {
                toggleModal();
              }
            }}
            className='text-lg font-bold text-white bg-green-500 w-full rounded-md py-2 hover:bg-green-600 transition'
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/productCategory`
  );
  const productCategory = await res2.json();

  return {
    props: {
      productCategory,
    },
  };
}
