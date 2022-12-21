import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "../../components/Dashboard/Layout";
import Card from "../../components/Dashboard/Groups/Card";

const Page: NextPageWithLayout = () => {
  const cards = [
    {
      title: "Card 1",
      description: "This is a description for card 1",
      date: "Jan 1",
      totalDataUsed: 50,
    },
    {
      title: "Card 2",
      description: "This is a description for card 2",
      date: "Jan 2",
      totalDataUsed: 75,
    },
    {
      title: "Card 3",
      description: "This is a description for card 3",
      date: "Jan 3",
      totalDataUsed: 25,
    },

    {
      title: "Card 4",
      description: "This is a description for card 4",
      date: "Jan 4",
      totalDataUsed: 43,
    },
    // Add more cards here
  ];

  return (
    <>
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Data Groups
            </h1>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="px-4 py-6 sm:px-0"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-3 gap-4">
                {cards.map((card) => (
                  <Card
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    totalDataUsed={card.totalDataUsed}
                    date={card.date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
