import { BLOG_POSTS } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Generate static params for all blog posts
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Solar Company Blog`,
    description: post.excerpt,
  };
}

const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Find related posts (same category, exclude current)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  ).slice(0, 2);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Image */}
      <div className="relative h-[350px] md:h-[450px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 bg-[#32C36C] text-white text-xs font-semibold rounded-full mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-10 md:py-16 px-4 font-sans">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#32C36C] font-semibold mb-8 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Article Content */}
          <article className="prose prose-slate prose-lg max-w-none prose-headings:text-black prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-black prose-a:text-[#32C36C]">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-black mt-8 mb-4">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-semibold text-black mt-6 mb-3">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("| ")) {
                return null; // Skip table rows for now, rendered below
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="text-slate-600 ml-4 list-disc">
                    {line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                  </li>
                );
              }
              if (line.trim() === "") {
                return <br key={i} />;
              }
              return (
                <p key={i} className="text-slate-600 leading-relaxed mb-3">
                  {line}
                </p>
              );
            })}
          </article>

          {/* CTA */}
          <div className="mt-12 p-8 bg-slate-50 rounded-xl text-center">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
              Ready to go solar?
            </h3>
            <p className="text-slate-500 mb-6">
              Get a free, no-obligation quote from our team today.
            </p>
            <Button
              size="lg"
              className="bg-[#32C36C] hover:bg-[#2B9A5A] rounded-full"
              asChild
            >
              <Link href="/quote">Get a Free Quote</Link>
            </Button>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-black mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blog/${related.slug}`}>
                    <div className="flex gap-4 items-start group">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-slate-400">{related.date}</span>
                        <h4 className="text-sm font-bold text-black group-hover:text-[#32C36C] transition-colors duration-300">
                          {related.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
