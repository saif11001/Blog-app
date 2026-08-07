import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { assets } from "@/Assets/assets";
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
      <div className="bg-(--bg-primary) text-(--text-primary)">
        <div className="mx-auto max-w-5xl px-5 md:px-12 lg:px-28 py-16">
          <div className="text-center">
            <span className="inline-block bg-(--bg-secondary) text-(--text-secondary) text-xs font-medium px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
              Our Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-semibold leading-tight text-(--text-primary)">
              About This Blog
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-(--text-secondary)">
              Honest writing on startups, technology and lifestyle. This is the
              story of how it started — and where it's headed next.
            </p>
          </div>

          <div className="mt-24 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-(--text-secondary)">
              Our Journey
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-(--text-primary)">
              How It All Started
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-(--text-secondary)">
              From a handful of posts to a blog people actually make time to
              read — here's how it happened, step by step.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-(--border-color) md:block" />

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
                      <div className="relative h-56 sm:h-65 rounded-2xl overflow-hidden border border-(--border-color)">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="absolute left-1/2 top-6 z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-(--bg-primary) ring-4 ring-(--bg-primary) md:flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--text-primary) text-(--bg-primary)">
                        {step.icon === "TrendingUp" ? (
                          <TrendingUp size={20} />
                        ) : (
                          step.icon
                        )}
                      </div>
                    </div>

                    <div className="w-full md:w-1/2">
                      <div className="flex items-center gap-3 md:hidden">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--text-primary) text-(--bg-primary)">
                          {step.icon === "TrendingUp" ? (
                            <TrendingUp size={20} />
                          ) : (
                            step.icon
                          )}
                        </div>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-(--text-primary) md:mt-0">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-(--text-secondary)">
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-28 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-(--text-primary)">
              Who's Behind the Blog
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-secondary) sm:col-start-2"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={assets.author_img00}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 py-4 text-left">
                    <p className="text-sm font-semibold text-(--text-primary)">
                      {member.name}
                    </p>
                    <p className="text-xs text-(--text-secondary)">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-2xl font-semibold text-(--text-primary)">
              Enjoying the blog so far?
            </h2>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-(--text-primary) text-(--bg-primary) px-10 py-3.5 text-sm font-medium transition hover:opacity-90"
            >
              Read the Latest Posts
            </Link>
          </div>

          <div className="h-16" />
        </div>
      </div>
      <Footer />
    </>
  );
}