import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import _toast, { Toaster } from "react-hot-toast";

import getFormattedDiffs from "../lib/dateManipulation";
import EventName from "../components/EventName";

// Datepicker
import "react-datepicker/dist/react-datepicker.css";

// Day.js customizations
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Home() {
  const [date, setDate] = useState<Date>(new Date("Dec 24 2021"));
  const [eventName, setName] = useState<string>("Christmas 2021");

  const parsed = dayjs(date);
  const [today, setToday] = useState(dayjs());

  const { query }: any = useRouter();

  useEffect(() => {
    if (parsed.isAfter(today)) {
      const countDown = setInterval(() => {
        setToday(dayjs());
      }, 250);

      return () => {
        clearInterval(countDown);
      };
    }
  });

  useEffect(() => {
    if (query.name && query.date) {
      setName(decodeURIComponent(query.name));
      setDate(new Date(parseInt(query.date) * 1000));
    }
  }, [query]);

  const addQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    addQueryParam("date", (date.getTime() / 1000).toString());
    addQueryParam("name", encodeURIComponent(eventName));
  }, [date, eventName]);

  const diffParams = getFormattedDiffs(today, parsed);

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Head>
        <title>CountDowner</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav className="w-screen text-xm gap-10 bg-[#262A2B] text-white py-4 cursor-pointer">
          <span>Create countdown</span>
          <a
            href="https://github.com/filiptronicek/CountDowner"
            target="_blank"
            rel="noreferrer noopener"
          >
            Source code
          </a>
        </nav>
      </header>

      <main className="text-center">
        <Toaster />
        <EventName
          eventName={eventName}
          setName={setName}
          date={date}
          setDate={setDate}
        />
        <div>
          {parsed.isAfter(today) ? (
            <div id="countdown-area" className="mt-5 text-4xl">
              {diffParams}
            </div>
          ) : (
            <div className="mt-5 text-4xl">
              This countdown has passed {today.to(parsed)}
            </div>
          )}
        </div>
      </main>

      <footer>By @filiptronicek with 💖</footer>
    </div>
  );
}
