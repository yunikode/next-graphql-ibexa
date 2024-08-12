import Link from "next/link";

import { getAllPosts } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h2>
    </section>
  );
}

function HeroPost({ title, path }: { title: string; path: string }) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <h2>{title}</h2>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={path} className="hover:underline">
              {title}
            </Link>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const allPosts = await getAllPosts();

  return (
    <div className="container mx-auto px-5">
      <Intro />
      {allPosts &&
        allPosts.map((post) => (
          <HeroPost
            title={post.node.title}
            path={post.node._location.urlAliases[0].path}
          />
        ))}
    </div>
  );
}
