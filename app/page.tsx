import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <h1 className="text-4xl">
        <Link href="/admin">
          Admin
        </Link>
      </h1>
    </div>
  );
}
