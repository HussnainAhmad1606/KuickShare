import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-6xl font-bold">Private and Secure Content Storage</h1>
      <p className="my-10">Easily save and share your links and text with complete data protection</p>
      <Button asChild>
  <Link href="/login">Get Started</Link>
</Button>
    </div>
  );
}
