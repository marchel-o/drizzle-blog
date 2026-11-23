'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default async function Home() {
  // const posts = await getPosts();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // Gunakan path relatif '/api/posts', jangan 'http://localhost:3000/api/posts'
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <main className="container mt-4">
      <h1>Blog Posts</h1>
      <Link href="/create" className="btn btn-primary mb-3">
        Create Post
      </Link>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="list-group">
          {posts.map((post: unknown) => (
            <li key={(post as { id: string }).id} className="list-group-item">
              <Link href={`/post/${(post as { id: string }).id}`}>
                {(post as { title: string }).title}
              </Link>
              <span className="text-muted float-end">
                {new Date((post as { createdAt: string }).createdAt).toLocaleDateString('id-ID')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}