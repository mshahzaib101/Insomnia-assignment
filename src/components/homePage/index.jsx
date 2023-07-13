"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import Currencies from "@/utils/currencies";
import RefreshIntervels from "@/utils/refreshIntervels";
import PageContent from "@/components/homePage/pageContent";
import PricingCard from "@/components/homePage/pricingCard";

const customStyles = {
  // Change the background color of the control
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "blue",
  }),
  option: (provided, state) => ({
    ...provided,
    // Change the background color of options
    backgroundColor: "white",
    color: "black",
    ":hover": {
      backgroundColor: "lightgray", // Change the background color on hover
    },
  }),
};

function HomePage() {
  const [priceData, setPriceData] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(
    typeof window !== "undefined" &&
      JSON.parse(window?.localStorage.getItem("refreshInterval"))
      ? JSON.parse(window?.localStorage.getItem("refreshInterval"))
      : RefreshIntervels[0]
  );
  const [displayCurrencies, setDisplayCurrencies] = useState(
    typeof window !== "undefined" &&
      JSON.parse(window?.localStorage.getItem("displayCurrencies"))
      ? JSON.parse(window?.localStorage.getItem("displayCurrencies"))
      : [...Currencies]
  );

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await response.json();
      setPriceData(data);
    } catch (error) {
      console.error("Error fetching BTC price:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval.value * 1000);

    // Clear the interval on cleanup
    return () => clearInterval(interval);
  }, [refreshInterval]);

  useEffect(() => {
    // Store refreshInterval value in localStorage
    window.localStorage.setItem(
      "refreshInterval",
      JSON.stringify(refreshInterval)
    );

    // Store displayCurrencies value in localStorage
    window.localStorage.setItem(
      "displayCurrencies",
      JSON.stringify(displayCurrencies)
    );
  }, [refreshInterval, displayCurrencies]);

  return (
    <div className="relative isolate overflow-hidden pt-14">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Background shape */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 sm:py-28 lg:py-32">
        {/* Bottom-left shape */}
        <div
          className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
          aria-hidden="true"
        >
          <div
            className="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          {/* Page content */}
          <PageContent />
        </div>
        {priceData ? (
          <div>
            {/* Price cards */}
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {displayCurrencies.map(({ value: currency }) => (
                <div key={currency} className="my-4">
                  <div className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
                    {/* Currency description */}
                    <dt className="text-sm leading-6">
                      {priceData.bpi[currency].description}
                    </dt>
                    {/* Currency rate */}
                    <dd className="order-first text-3xl font-semibold tracking-tight">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: priceData.bpi[currency].symbol,
                        }}
                      />
                      {priceData.bpi[currency].rate}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            {/* Updated time and settings */}
            <div className="mt-20">
              <div className="mt-2">
                <p className="text-base font-semibold leading-8 text-white">
                  Updated:{" "}
                  <span className="text-gray-300 font-normal">
                    {priceData.time.updated}
                  </span>
                </p>
              </div>
              <div className="mt-2 ">
                {/* Refresh interval select */}
                <label
                  htmlFor="location"
                  className="text-base font-semibold leading-8 text-white"
                >
                  Refresh Interval:
                </label>
                <div className="max-w-sm">
                  <Select
                    options={RefreshIntervels}
                    isSearchable
                    styles={customStyles}
                    defaultValue={refreshInterval}
                    onChange={setRefreshInterval}
                  />
                </div>
              </div>
              <div className="mt-2 ">
                {/* Display currencies select */}
                <label
                  htmlFor="location"
                  className="text-base font-semibold leading-8 text-white"
                >
                  Currencies:
                </label>
                <div className="max-w-sm">
                  <Select
                    options={Currencies}
                    isMulti
                    isSearchable
                    styles={customStyles}
                    defaultValue={displayCurrencies}
                    onChange={setDisplayCurrencies}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Loading state
          <div className="flex justify-center items-center my-40">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Loading spinner */}
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <PricingCard
          priceData={priceData}
          refreshInterval={refreshInterval}
          setRefreshInterval={setRefreshInterval}
          displayCurrencies={displayCurrencies}
          setDisplayCurrencies={setDisplayCurrencies}
        />
      </div>
      {/* Bottom-right shape */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

export default HomePage;
