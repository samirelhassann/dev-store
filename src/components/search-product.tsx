"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";

export default function SearchProduct() {
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get("q") ?? "");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      router.push(`/search?q=${text}`);
    }, 1000);
    setTimer(newTimer);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, text]);

  return (
    <div className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
      <Search className="w-5 h-5 text-zinc-500" />

      <input
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        placeholder="Search products"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
