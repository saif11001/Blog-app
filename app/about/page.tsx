import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Lightbulb,
  TrendingUp,
  Globe,
  Eye,
} from "lucide-react";

const journey = [
  {
    icon: <Sparkles size={20} />,
    title: "From a Simple Idea",
    text: "This blog started as a small side project — a place to write down thoughts on startups, technology, and everyday life without the noise. What began as a handful of posts has grown into a space readers keep coming back to.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80",
  },
  {
    icon: <Lightbulb size={20} />,
    title: "Finding Our Voice",
    text: "In the first few months, the focus became clear: honest, well-researched writing over quick takes. We started organizing posts into categories — Startup, Technology, and Lifestyle — so readers could find exactly what they came for.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80",
  },
  {
    icon: "TrendingUp",
    title: "Growing With Our Readers",
    text: "As the audience grew, so did the care behind every post. We introduced an email newsletter for anyone who wanted new articles delivered straight to their inbox, and we've kept refining the writing and the reading experience ever since.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80",
  },
  {
    icon: <Globe size={20} />,
    title: "Reaching Further",
    text: "Today, readers from all over follow along for fresh perspectives on where technology and business are headed. Building that kind of trust, one post at a time, is still what matters most to us.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80",
  },
  {
    icon: <Eye size={20} />,
    title: "What's Next",
    text: "We're just getting started. More in-depth articles, more categories, and a lot more honest writing are on the way — always with the same goal: content worth your time.",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&q=80",
  },
];

const team = [
  {
    name: "Saif El-Deen",
    role: "Founder & Editor-in-Chief",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <span className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600">
            Our Story
          </span>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-black sm:text-5xl">
            About This Blog
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
            Honest writing on startups, technology and lifestyle. This is the
            story of how it started — and where it's headed next.
          </p>
        </div>

        <div className="mt-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Our Journey
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-black sm:text-3xl">
            How It All Started
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-gray-500">
            From a handful of posts to a blog people actually make time to
            read — here's how it happened, step by step.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gray-200 md:block" />

          <div className="space-y-16">
            {journey.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col items-center gap-8 md:flex-row ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="overflow-hidden rounded-[40px] border-4 border-black">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={500}
                        height={260}
                        className="h-65 w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-6 z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-white text-black ring-4 ring-white md:flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-b from-gray-800 via-gray-700 to-black text-white">
                      {step.icon === "TrendingUp" ? (
                        <TrendingUp size={20} />
                      ) : (
                        step.icon
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <div className="flex items-center gap-3 md:hidden">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-b from-gray-800 via-gray-700 to-black text-white">
                        {step.icon === "TrendingUp" ? (
                          <TrendingUp size={20} />
                        ) : (
                          step.icon
                        )}
                      </div>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-black md:mt-0">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-28 text-center">
          <h2 className="text-2xl font-extrabold text-black sm:text-3xl">
            Who's Behind the Blog
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white sm:col-start-2"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={256}
                  className="h-64 w-full object-cover"
                />
                <div className="bg-linear-to-b from-gray-800 via-gray-700 to-black px-4 py-4 text-left">
                  <p className="text-sm font-semibold text-white">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-300">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-black">
            Enjoying the blog so far?
          </h2>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-linear-to-b from-gray-800 via-gray-700 to-black px-10 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Read the Latest Posts
          </Link>
        </div>

        <div className="h-16" />
      </div>
      <Footer />
    </>
  );
}

