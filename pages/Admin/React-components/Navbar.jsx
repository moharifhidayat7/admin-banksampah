import Settings from "./Settings";

export default function Header(props) {
  const toggler = () => {
    props.openSide(!props.sidebr);
    localStorage.setItem("togler", props.sidebr);
  };
  return (
    <div className="bg-gradient-to-l from-green-300 to-white shadow-lg w-full z-10 fixed italic">
      <div className="flex px-2 justify-between lg:px-12 ">
        <div className="flex items-center h-12">
          {!props.sidebr && (
            <div className="mr-10 flex items-center space-x-2">
              <img
                className="rounded-full w-8"
                src="/Logo/banksampah.jfif"
                alt="logo"
              />
              <div className="font-bold italic text-sm">
                <p>Bank Sampah</p>
                <p>Banyuwangi</p>
              </div>
            </div>
          )}

          <div
            onClick={toggler}
            className="w-8 text-green-700 mr-4 lg:mr-10 cursor-pointer pointer-events"
          >
            {props.sidebr ? (
              <svg
                className="transform hover:-rotate-180  duration-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="transform hover:scale-110 hover:rotate-90 duration-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <div
            className={`${
              props.sidebr ? `flex` : ` hidden`
            } bg-white overflow-hidden items-center lg:flex rounded-2xl shadow  pl-2 justify-between`}
          >
            <input
              type="text"
              className="focus:outline-none  bg-transparent lg:w-60 w-52   text-sm lg:text-base"
              placeholder="Apa yang anda cari?"
            />
            <div className="w-8 text-green-700 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="items-center flex ">
          <img
            className="rounded-full w-10 mr-3 hidden lg:block"
            src="http://placehold.jp/500x500.png"
            alt="profile"
          />
          <div className="items-center -space-y-1  hidden lg:block ">
            <div className="font-bold text-base opacity-50">
              My Name is Koko
            </div>
            <div className="text-xs font-light font-mono">
              Manager bank sampah
            </div>
          </div>
          <Settings />
        </div>
      </div>
    </div>
  );
}
