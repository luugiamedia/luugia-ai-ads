"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

export default function Home() {

  const [product, setProduct] = useState("");
  const [customer, setCustomer] = useState("");
  const [style, setStyle] = useState("");
  const [platform, setPlatform] = useState("TikTok Ads");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState<any[]>([]);

  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [finalVideo, setFinalVideo] = useState("");

  // =========================
  // GENERATE AI ADS
  // =========================
const exportTVC = async () => {

  try {

    const res = await fetch("/api/export-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        script: result,
        video: videoUrl,
        image: imageUrl,
      }),
    });

    const data = await res.json();

    if (data.video) {
      setFinalVideo(data.video);
    }

  } catch (error) {

    console.log(error);

  }

};
  const generateAI = async () => {

    try {

      setLoading(true);

      const res = await fetch("/api/generate", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          product,
          customer,
          style,
          platform,
        }),
      });

      const data = await res.json();

      if (data.output) {

        setResult(data.output);

        setHistory((prev) => [
          {
            product,
            output: data.output,
            createdAt: new Date().toLocaleString(),
          },
          ...prev,
        ]);

      } else {

        setResult(data.error || "Something went wrong");

      }

    } catch (error) {

      console.log(error);

      setResult("Error generating AI ads");

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // GENERATE VIDEO
  // =========================

  const generateVideo = async () => {

    try {

      const res = await fetch("/api/generate-video", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: result,
        }),
      });

      const data = await res.json();

      console.log("VIDEO DATA:", data);

      if (data.video) {

        if (Array.isArray(data.video)) {

          setVideoUrl(data.video[0]);

        } else {

          setVideoUrl(data.video);

        }
      }

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // GENERATE IMAGE
  // =========================

  const generateImage = async () => {

    try {

      const res = await fetch("/api/generate-image", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: result,
        }),
      });

      const data = await res.json();

      console.log("IMAGE DATA:", data);

      if (data.image) {

        if (Array.isArray(data.image)) {

          setImageUrl(data.image[0]);

        } else {

          setImageUrl(data.image);

        }
      }

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_25%)]" />

      <div className="absolute inset-0 backdrop-blur-3xl" />

      {/* HEADER */}

      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-white/5">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-2xl font-black tracking-wide">
              Lưu Gia AI Ads
            </h1>

            <p className="text-xs text-zinc-400 mt-1">
              Cinematic AI Advertising Generator
            </p>

          </div>

          <div className="flex items-center gap-4">

            <UserButton />

            <button className="px-5 py-2 rounded-full bg-white text-black font-semibold">
              Start Creating
            </button>

          </div>

        </div>

      </header>

      {/* HERO */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT */}

        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6">

            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <span className="text-sm text-zinc-300">
              AI Powered Cinematic Ads Generator
            </span>

          </div>

          <h2 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">

            Create

            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              Viral Video Ads
            </span>

            In Seconds.

          </h2>

          <p className="mt-8 text-lg text-zinc-400 max-w-xl leading-relaxed">

            Generate cinematic hooks, storyboard scenes,
            TikTok ad scripts, AI video prompts and
            premium ad concepts instantly.

          </p>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="relative rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl shadow-black/50">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h3 className="text-2xl font-bold">
                  AI Campaign Generator
                </h3>

                <p className="text-zinc-400 mt-1 text-sm">
                  Build cinematic ad concepts instantly
                </p>

              </div>

              <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                AI Connected
              </div>

            </div>

            {/* FORM */}

            <div className="grid gap-5">

              <input
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none"
                placeholder="Product Name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />

              <input
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none"
                placeholder="Target Customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />

              <input
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none"
                placeholder="Cinematic Style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              />

              <select
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:outline-none text-zinc-400"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >

                <option>TikTok Ads</option>
                <option>Facebook Ads</option>
                <option>YouTube Shorts</option>
                <option>Instagram Reels</option>

              </select>

              <button
                onClick={generateAI}
                className="mt-3 w-full p-5 rounded-2xl bg-white text-black font-black text-lg"
              >
                {loading ? "Generating..." : "Generate Cinematic AI Ads"}
              </button>

              <button
                onClick={generateVideo}
                className="w-full p-5 rounded-2xl bg-purple-600 text-white font-black text-lg"
              >
                Generate AI Video
              </button>
<button
  onClick={exportTVC}
  className="w-full p-5 rounded-2xl bg-green-600 text-white font-black text-lg"
>
  Export Final TVC
</button>
              <button
                onClick={generateImage}
                className="w-full p-5 rounded-2xl bg-pink-600 text-white font-black text-lg"
              >
                Generate Storyboard Image
              </button>

            </div>

            {/* OUTPUT */}

            <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">

              <div className="flex items-center justify-between mb-5">

                <h4 className="font-bold text-lg">
                  AI Output Preview
                </h4>

                <div className="text-xs text-zinc-500">
                  Gemini AI Engine
                </div>

              </div>

              {/* ACTION BUTTONS */}

              <div className="flex gap-3 mb-5">

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result);
                    alert("Copied!");
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-black font-semibold"
                >
                  Copy Prompt
                </button>

                <button
                  onClick={() => {

                    const blob = new Blob([result], {
                      type: "text/plain",
                    });

                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");

                    a.href = url;
                    a.download = "luugia-ai-script.txt";

                    a.click();

                  }}
                  className="px-4 py-2 rounded-xl border border-white/20"
                >
                  Export TXT
                </button>

              </div>

              <div className="space-y-5 text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">

                {result || `AI cinematic ads will appear here...`}

              </div>

              {/* VIDEO */}

              {
                videoUrl && (
                  <video
                    controls
                    autoPlay
                    className="mt-8 rounded-3xl w-full"
                    src={videoUrl}
                  />
                )
              }
{
  finalVideo && (
    <video
      controls
      autoPlay
      className="mt-8 rounded-3xl w-full"
      src={finalVideo}
    />
  )
}
              {/* IMAGE */}

              {
                imageUrl && (
                  <img
                    src={imageUrl}
                    alt="AI Storyboard"
                    className="mt-8 rounded-3xl w-full"
                  />
                )
              }

            </div>

          </div>

        </div>

      </section>

      {/* HISTORY */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-3xl font-bold mb-8">
          Campaign History
        </h2>

        <div className="grid gap-5">

          {
            Array.isArray(history) &&
            history.map((item, index) => (

              <div
                key={index}
                className="p-6 rounded-3xl bg-white/5 border border-white/10"
              >

                <h3 className="font-bold text-xl mb-3">
                  {item.product}
                </h3>

                <p className="text-zinc-500 text-sm mb-4">
                  {item.createdAt}
                </p>

                <div className="text-zinc-300 whitespace-pre-wrap text-sm">
                  {item.output}
                </div>

              </div>

            ))
          }

        </div>

      </section>

    </main>
  );
}