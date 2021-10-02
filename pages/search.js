import { format } from "date-fns";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuest } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuest} guests`}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-sm">
            300+ Stays for - {range} - {numberOfGuest} number of guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex space-x-3 mb-5 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResults?.map(
              ({ img, location, title, total, price, star, description }) => (
                <InfoCard
                  key={img}
                  img={img}
                  title={title}
                  location={location}
                  total={total}
                  price={price}
                  star={star}
                  description={description}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden md:inline-flex md:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
