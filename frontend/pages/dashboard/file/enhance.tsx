import React, { useRef, useEffect, useState } from "react";

import { NextPageWithLayout } from "../../_app";
import { ReactElement } from "react";
import Layout from "../../../components/Dashboard/Layout";
import FileDrop from "../../../components/Dashboard/File/FileDrop";
import axios from "axios";

const { Configuration, OpenAIApi } = require("openai");

const Page: NextPageWithLayout = () => {
  const [csvData, setCSVData] = useState<any>(null);
  const OPEN_AI_KEY = "0";
  const [fixedData, setFixedData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const readFileContent = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleFileDrop = async (file: File) => {
    console.log("File dropped: ", file);
    // store the file content in state
    const fileContent = await readFileContent(file);

    try {
      //   const response = await axios.post('https://api.openai.com/v1/completions',
      //     {
      //         headers: {
      //             "Authorization": `Bearer ${OPEN_AI_KEY}`,
      //             "Content-Type": "application/json"
      //         },
      //         data: {
      //             prompt: fileContent,
      //             model:"text-davinci-003",
      //             temperature:0,
      //             max_tokens:100,
      //             top_p:1.0,
      //             frequency_penalty:0.0,
      //             presence_penalty:0.0
      //         }
      //     }
      //   );
      setLoading(true);

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: fileContent,

        temperature: 0.5,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const fixedContent = response.data.choices[0].text;
      setFixedData(fixedContent);
      console.log(fixedContent);
      setLoading(false);
      // update the state with the fixed content
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    // console.log(csvData);
    }, [fixedData]);

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
          {/* create a loading  */}
          {loading && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="container mx-auto">
                  <div className="flex justify-center">
                    <div className="flex space-x-2 animate-pulse">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="container mx-auto">
                <FileDrop onFileDrop={handleFileDrop} />
              </div>
            </div>
            {fixedData && (
            <div className="mockup-code p-5">
              <pre data-prefix="$">
                <code >{fixedData}</code>
              </pre>
            </div>
          )}
          </div>

          {/* Display fixed content if exists in code block */}

        </div>
      </main>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
