import Link from "next/link";

function PageContent() {
  return (
    <div>
      <div className="hidden sm:flex">
        {/* External link */}
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
          Stay Informed About the Latest Bitcoin Prices{" "}
          <Link
            target="_blank"
            href="https://api.coindesk.com/v1/bpi/currentprice.json"
            className="font-semibold text-white"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            REST <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Title and description */}
      <p className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Bitcoin (BTC) Price Index
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-300">
        Track the current price index of Bitcoin (BTC) in various currencies.
        Stay updated with real-time prices and toggle the display of different
        currencies. Choose your preferred refresh interval to keep the
        information up to date.
      </p>
    </div>
  );
}

export default PageContent;
