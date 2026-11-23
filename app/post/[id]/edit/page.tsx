'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function EditPostContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Ambil data lama untuk mengisi form
  useEffect(() => {
    if (!id) return;

    fetch(`/api/posts/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setTitle(data.title);
          setContent(data.content);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    setSaving(false);

    if (res.ok) {
      router.push(`/post/${id}`);
    } else {
      alert('Gagal menyimpan perubahan');
    }
  };

  if (loading) return <p className="container mt-4">Loading...</p>;

  return (
    <main className="container mt-4">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2" disabled={saving}>
          {saving ? 'Saving...' : 'Update Post'}
        </button>
        <Link href={`/post/${id}`} className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </main>
  );
}

export default function EditPostPage() {
  return (
    <Suspense fallback={<p className="container mt-4">Loading...</p>}>
      <EditPostContent />
    </Suspense>
  );
}