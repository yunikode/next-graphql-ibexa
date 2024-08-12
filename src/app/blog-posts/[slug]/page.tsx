import Link from "next/link";
import { draftMode } from "next/headers";

import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { post } = await getPostAndMorePosts(params.slug);

  console.log("p", post);

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <article>
        <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
          {post.title}
        </h1>

        <div className="mx-auto max-w-2xl">
          <div
            dangerouslySetInnerHTML={{ __html: post.body.html5 }}
            className="prose"
          ></div>
        </div>
      </article>
    </div>
  );
}
