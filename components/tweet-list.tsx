"use client";

import { getMoreTweets } from "@/app/(tabs)/tweets/action";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface TweetListProps {
  tweet: {
    tweet: string;
    id: number;
    created_at: Date;
    user: {
      id: number;
      username: string;
      password: string;
      email: string;
      avatar: string;
      bio: string | null;
      created_at: Date;
      updated_at: Date;
    };
  }[];
}

export default function TweetList({ tweet }: TweetListProps) {
  const [tweets, setTweets] = useState(tweet);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(page + 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev + 1);
      setTweets((prev) => [...prev, ...newTweets]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="w-full bg-slate-400 h-px"></div>
      {tweets.map((tweet, index) => (
        <div key={index}>
          <div className="flex mt-6 gap-3">
            <Link href={`/profile/${tweet.user.id}`}>
              <div className="ml-5 size-10 bg-gray-400 rounded-full mt-1"></div>
            </Link>
            <Link href={`/profile/${tweet.user.id}`}>
              <div className="font-bold">{tweet.user.username}</div>
            </Link>
          </div>
          <Link href={`/tweets/${tweet.id}`}>
            <div className="mb-4">
              <div className="break-words ml-[4.5rem] -mt-5">{tweet.tweet}</div>
            </div>
            <div className="w-full bg-slate-400 h-px"></div>
          </Link>
        </div>
      ))}
      {isLastPage ? (
        <div>last page</div>
      ) : (
        <div
          onClick={onLoadMoreClick}
          className="flex justify-center items-center bg-red-400 mb-20"
        >
          more
        </div>
      )}
    </>
  );
}
