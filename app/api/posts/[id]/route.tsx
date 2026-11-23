import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <main>
      {allPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </main>
  );
}