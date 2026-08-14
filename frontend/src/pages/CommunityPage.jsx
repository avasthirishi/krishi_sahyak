import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api, { authAPI } from '../services/api';

const CATEGORIES = ['all', 'general', 'crop', 'market', 'weather', 'technology', 'livestock'];
const ROLE_BADGE = { FARMER: 'bg-green-100 text-green-800', RESEARCHER: 'bg-blue-100 text-blue-800', MANDI_OWNER: 'bg-amber-100 text-amber-800', LAB_OWNER: 'bg-purple-100 text-purple-800', SUPER_ADMIN: 'bg-red-100 text-red-800' };

function PostCard({ post, currentUser, onLike, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
          {(post.author?.profile?.fullName || post.author?.email || '?')[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-800 text-sm">{post.author?.profile?.fullName || 'Anonymous'}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_BADGE[post.author?.role] || 'bg-gray-100 text-gray-600'}`}>{post.author?.role?.replace('_', ' ')}</span>
          </div>
          <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        {(currentUser?.id === post.authorId || currentUser?.role === 'SUPER_ADMIN') && (
          <button onClick={() => onDelete(post.id)} className="text-gray-300 hover:text-red-400 text-lg leading-none">×</button>
        )}
      </div>

      {post.title && <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>}
      <p className="text-gray-700 text-sm mb-3 leading-relaxed">{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="" className="rounded-lg w-full max-h-48 object-cover mb-3" />}

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">#{t}</span>)}
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-3">
        <button onClick={() => onLike(post.id)} className="flex items-center gap-1 hover:text-green-600 transition-colors">
          👍 <span>{post.likesCount}</span>
        </button>
        <Link to={`/community/${post.id}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          💬 <span>{post._count?.comments || 0} comments</span>
        </Link>
        <span className="ml-auto text-xs bg-gray-50 px-2 py-1 rounded-full">{post.category}</span>
      </div>
    </div>
  );
}

function NewPostForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ title: '', content: '', category: 'general', tags: '', imageUrl: '' });
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
    setForm({ title: '', content: '', category: 'general', tags: '', imageUrl: '' });
    setOpen(false);
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} className="w-full py-3 border-2 border-dashed border-green-300 text-green-700 rounded-xl font-medium hover:bg-green-50 transition-colors">
      + Share something with the community
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-green-200 rounded-xl p-5 shadow-sm space-y-3">
      <h3 className="font-semibold text-gray-800">New Post</h3>
      <input type="text" placeholder="Title (optional)" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
      <textarea required rows={4} placeholder="Share your experience, question, or knowledge…" value={form.content}
        onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
      <div className="grid grid-cols-2 gap-3">
        <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          {CATEGORIES.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="text" placeholder="Tags (comma separated)" value={form.tags}
          onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
      </div>
      <input type="url" placeholder="Image URL (optional)" value={form.imageUrl}
        onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-60">
          {loading ? 'Posting…' : 'Post'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
      </div>
    </form>
  );
}

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const currentUser = (() => { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } })();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...(category !== 'all' && { category }) };
      const res = await api.get('/community', { params });
      setPosts(res.data.data.posts);
      setTotalPages(res.data.data.pagination.totalPages || 1);
    } catch { setPosts([]); } finally { setLoading(false); }
  }, [category, page]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handlePost = async (formData) => {
    setPosting(true);
    try {
      await api.post('/community', formData);
      setPage(1);
      loadPosts();
    } catch (err) { alert(err.response?.data?.message || 'Failed to post'); } finally { setPosting(false); }
  };

  const handleLike = async (id) => {
    if (!isLoggedIn) { alert('Please login to like posts'); return; }
    try {
      const res = await api.post(`/community/${id}/like`);
      setPosts(p => p.map(post => post.id === id ? { ...post, likesCount: res.data.data.likesCount } : post));
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try { await api.delete(`/community/${id}`); loadPosts(); } catch {}
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">👨‍🌾 Community</h1>
        <p className="text-gray-600">Connect with farmers, researchers, mandi owners, and lab experts.</p>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => { setCategory(c); setPage(1); }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* New post form */}
      {isLoggedIn ? (
        <div className="mb-6"><NewPostForm onSubmit={handlePost} loading={posting} /></div>
      ) : (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
          <p className="text-green-700 text-sm"><Link to="/login" className="font-semibold hover:underline">Login</Link> or <Link to="/signup" className="font-semibold hover:underline">sign up</Link> to post and comment.</p>
        </div>
      )}

      {/* Posts */}
      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-4xl mb-3">🌱</p>
          <p className="font-medium">No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(p => <PostCard key={p.id} post={p} currentUser={currentUser} onLike={handleLike} onDelete={handleDelete} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40">← Prev</button>
          <span className="px-4 py-2 text-sm text-gray-600">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-40">Next →</button>
        </div>
      )}
    </div>
  );
}
