import Link from "next/link";

const NFTCard = ({ ele }) => {
  const { contract, media, timeLastUpdated, title, description, tokenId } = ele;
  const contractAddress = contract?.address || "";
  const tokenType = ele?.tokenType || "";
  const symbol = contract?.symbol || "";
  const totalSupply = contract?.totalSupply || "";

  const imageClassName =
    "aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]";
  const roundedClassName = "relative inset-0 rounded-2xl";

  return (
    <>
      <Link
        href={`https://sepolia.etherscan.io/address/${contractAddress}`}
        className="flex flex-col items-start justify-between"
        target="_blank"
      >
        <div className="relative w-full">
          <img src={media[0]?.gateway} alt="" className={imageClassName} />
          <div
            className={`${roundedClassName} ring-1 ring-inset ring-gray-900/10`}
          />
        </div>
        <div className="max-w-xl">
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs">
            <time dateTime={timeLastUpdated} className="text-gray-300">
              {timeLastUpdated &&
                new Date(timeLastUpdated).toLocaleTimeString()}
            </time>
            <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
              {tokenType}
            </p>
            {symbol && (
              <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                Symbol: {symbol}
              </p>
            )}
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-gray-600">
              <span className="absolute inset-0" />
              {title}
            </h3>
            <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-300 h-12">
              {description?.length > 0 ? description : "-"}
            </p>
            <p className="mt-4 text-gray-300">
              <span className="font-normal text-white">Address: </span>
              {contractAddress.slice(0, 12)}...
            </p>
            <p className="mt-2 text-gray-300">
              <span className="font-normal text-white">TokenId: </span>
              {tokenId}
            </p>
            <p className="mt-2 text-gray-300">
              <span className="font-normal text-white">Supply: </span>
              {totalSupply}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NFTCard;
