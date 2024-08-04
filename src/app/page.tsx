"use client";

import { BannerCanvasProps } from "@/types/banner";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import("@/components/Banner"), { ssr: false });

const Home = () => {
  const [q, setQ] = useState("");
  const [banners, setBanners] = useState<{
    [key: string]: BannerCanvasProps[];
  } | null>(null);
  const [selectOption, setSelectOption] = useState<string | null>(null);

  const onGenerate = async () => {
    const res = await axios.get<{ banners: BannerCanvasProps[] }>("/db.json");
    setBanners(
      Object.groupBy(res.data.banners, ({ size }) => size) as Record<
        string,
        BannerCanvasProps[]
      >
    );
  };

  useEffect(() => {
    onGenerate();
  }, []);

  return (
    <main className="container max-w-[90%] mx-auto space-y-4">
      <header className="flex items-center justify-center gap-4 mt-4">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
        <div>
          <h1 className="text-2xl">BannerBot</h1>
          <p>AI Banner Maker</p>
        </div>
      </header>
      <div className="query flex flex-col gap-4">
        <label htmlFor="query">Enter prompt to generate banners</label>
        <textarea
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter prompt to generate banners"
          name="query"
          className="w-full border rounded px-4 py-3 border-[#1e293b]"
          id="query"
        ></textarea>
        <button
          className="bg-[#294744] px-4 py-3 rounded text-white w-full md:w-fit"
          onClick={onGenerate}
        >
          Generate
        </button>
      </div>
      {banners && (
        <div className="select-container space-x-4">
          <label htmlFor="size">Select Size: </label>
          <select
            name="size"
            id="size"
            value={selectOption ?? "square"}
            className="capitalize border border-[#1e293b] px-4 py-2 rounded"
            onChange={(e) => setSelectOption(e.target.value)}
          >
            {Object.keys(banners ?? {}).map((size, index) => (
              <option key={index} value={size} className="capitalize">
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
      <div
        className="banners-container overflow-x-hidden sm:columns-2 gap space-y-2"
        style={{
          columnGap: "0.5rem",
        }}
      >
        {banners?.[selectOption ?? "square"]?.map((banner) => (
          <Banner key={banner.id} banner={banner} selectOption={selectOption} />
        ))}
      </div>
    </main>
  );
};

export default Home;
