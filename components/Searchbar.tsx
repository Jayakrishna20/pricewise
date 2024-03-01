"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

const isValidLinkAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidLinkAmazonProductURL(searchPrompt);

    if (!isValidLink) return alert("Please provide a valid Amazon link");

    try {
      setisLoading(true);

      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
      />

      <button type="submit" className="searchbar-btn" disabled={searchPrompt === ""}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
