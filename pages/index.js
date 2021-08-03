import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  return (
    <div>
      {/* Document title */}
      <Head>
        <title>Dev Blog</title>
      </Head>

      <div className="posts">
        {posts.map((post) => {
          return <Post post={post} key={post.slug} />;
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from posts directory
  const files = fs.readdirSync(path.join("posts"));

  // Get slug from posts
  const posts = files.map((file) => {
    // create a slug
    const slug = file.replace(".md", "");

    // get front matter
    const markdownWithMeta = fs.readFileSync(path.join("posts", file), "utf-8");

    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  console.log(posts);
  /*
  [
  {
    slug: 'test',
    frontmatter: {
      title: 'Test Post',
      date: 'June 24 2021',
      excerpt: 'Excerpt',
      cover_image: '/images/posts/img1.jpg'
    }
  }
]
  */
  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
