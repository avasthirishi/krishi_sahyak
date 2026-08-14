import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const TAB_CONFIG = [
  { key: 'users',    label: '👥 Pending Users',    icon: '👥' },
  { key: 'news',     label: '📰 News',              icon: '📰' },
  { key: 'research', label: '🔬 Research Papers',   icon: '🔬' },
  { key: 'notices',  label: '📢 Notices',           icon: '📢' },
  { key: 'events',   label: '📅 Events',            icon: '📅' },
  { key: 'weather',  label: '🌦️ Weather Alerts',   icon: '🌦️' },
  { key: 'mandi',    label: '🏪 Mandi Prices',      icon: '🏪' },
  { key: 'crops',    label: '🌾 Crop Details',      icon: '🌾' },
];

const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500';

function useAdminApi(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoint);
      const d = res.data.data;
      setData(d.users || d.papers || d.notices || d.events || d.alerts || d.entries || d.resources || d.articles || []);
    } catch { setData([]); } finally { setLoading(false); }
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);
  return { data, loading, reload: load };
}

// ── Pending Users Tab ─────────────────────────────────────────────────────────
function PendingUsersTab() {
  const { data: users, loading, reload } = useAdminApi('/admin/users/pending');

  const handle = async (id, action) => {
    await api.patch(`/admin/users/${id}/${action}`);
    reload();
  };

  if (loading) return <p className="text-gray-500 py-8 text-center">Loading…</p>;
  if (!users.length) return <p className="text-gray-500 py-8 text-center">No pending registrations.</p>;

  return (
    <div className="space-y-4">
      {users.map(u => (
        <div key={u.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-gray-800">{u.profile?.fullName || 'N/A'}</p>
            <p className="text-sm text-gray-600">{u.email} — <span className="font-medium text-green-700">{u.role}</span></p>
            <p className="text-xs text-gray-500 mt-1">
              {u.profile?.institution && `Institution: ${u.profile.institution}`}
              {u.profile?.mandiName && `Mandi: ${u.profile.mandiName}`}
              {u.profile?.labName && `Lab: ${u.profile.labName}`}
              {u.profile?.village && `Village: ${u.profile.village}, ${u.profile.district}`}
              {u.profile?.phone && ` | Phone: ${u.profile.phone}`}
            </p>
            <p className="text-xs text-gray-400">Registered: {new Date(u.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handle(u.id, 'approve')} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">✓ Approve</button>
            <button onClick={() => handle(u.id, 'reject')} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">✗ Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Generic Form + List Tab ───────────────────────────────────────────────────
function ContentTab({ endpoint, fields, listKey, renderItem }) {
  const { data, loading, reload } = useAdminApi(endpoint);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setMsg('');
    try {
      await api.post(endpoint, form);
      setForm({});
      setMsg('Saved!');
      reload();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error saving');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    await api.delete(`${endpoint}/${id}`);
    reload();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Add New</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {fields.map(f => (
            <div key={f.name}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}{f.required && ' *'}</label>
              {f.type === 'textarea' ? (
                <textarea name={f.name} required={f.required} rows={3} value={form[f.name] || ''}
                  onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))}
                  className={inputCls} placeholder={f.placeholder} />
              ) : (
                <input type={f.type || 'text'} name={f.name} required={f.required} value={form[f.name] || ''}
                  onChange={e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))}
                  className={inputCls} placeholder={f.placeholder} />
              )}
            </div>
          ))}
          <button type="submit" disabled={saving} className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-60">
            {saving ? 'Saving…' : 'Save'}
          </button>
          {msg && <p className={`text-sm text-center ${msg === 'Saved!' ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
        </form>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Existing Records ({data.length})</h3>
        {loading ? <p className="text-gray-400 text-sm">Loading…</p> : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {data.map(item => (
              <div key={item.id} className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2">
                <div className="flex-1 min-w-0">{renderItem(item)}</div>
                <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 text-xs flex-shrink-0">🗑</button>
              </div>
            ))}
            {!data.length && <p className="text-gray-400 text-sm">No records yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('users');

  const user = (() => { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } })();
  useEffect(() => {
    if (!user || user.role !== 'SUPER_ADMIN') navigate('/login');
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const TAB_CONTENT = {
    users: <PendingUsersTab />,

    research: <ContentTab
      endpoint="/admin/research"
      listKey="papers"
      fields={[
        { name: 'title', label: 'Title', required: true, placeholder: 'Research paper title' },
        { name: 'authors', label: 'Authors', required: true, placeholder: 'Dr. Sharma, Dr. Singh' },
        { name: 'abstract', label: 'Abstract', required: true, type: 'textarea', placeholder: 'Paper abstract…' },
        { name: 'journal', label: 'Journal', placeholder: 'Journal name' },
        { name: 'pdfUrl', label: 'PDF URL', placeholder: 'https://…' },
        { name: 'publishedAt', label: 'Published Date', type: 'date' }
      ]}
      renderItem={p => <><p className="text-sm font-medium text-gray-800 truncate">{p.title}</p><p className="text-xs text-gray-500">{p.authors}</p></>}
    />,

    notices: <ContentTab
      endpoint="/admin/notices"
      listKey="notices"
      fields={[
        { name: 'title', label: 'Title', required: true, placeholder: 'Notice title' },
        { name: 'content', label: 'Content', required: true, type: 'textarea', placeholder: 'Notice content…' },
        { name: 'category', label: 'Category', placeholder: 'general / urgent / scheme' },
        { name: 'priority', label: 'Priority', placeholder: 'normal / high / critical' },
        { name: 'expiresAt', label: 'Expires On', type: 'date' }
      ]}
      renderItem={n => <><p className="text-sm font-medium text-gray-800">{n.title}</p><p className="text-xs text-gray-500">{n.category} — {n.priority}</p></>}
    />,

    events: <ContentTab
      endpoint="/admin/events"
      listKey="events"
      fields={[
        { name: 'title', label: 'Title', required: true, placeholder: 'Event title' },
        { name: 'description', label: 'Description', required: true, type: 'textarea', placeholder: 'Event details…' },
        { name: 'eventDate', label: 'Event Date & Time', required: true, type: 'datetime-local' },
        { name: 'location', label: 'Location', placeholder: 'City or Online' },
        { name: 'organizer', label: 'Organizer', placeholder: 'ICAR / State Govt' },
        { name: 'category', label: 'Category', placeholder: 'training / scheme / fair' },
        { name: 'registrationUrl', label: 'Registration URL', placeholder: 'https://…' },
        { name: 'imageUrl', label: 'Image URL', placeholder: 'https://…' }
      ]}
      renderItem={ev => <><p className="text-sm font-medium text-gray-800">{ev.title}</p><p className="text-xs text-gray-500">{new Date(ev.eventDate).toLocaleDateString()} — {ev.location}</p></>}
    />,

    weather: <ContentTab
      endpoint="/admin/weather-alerts"
      listKey="alerts"
      fields={[
        { name: 'title', label: 'Alert Title', required: true, placeholder: 'Heavy Rain Warning' },
        { name: 'message', label: 'Message', required: true, type: 'textarea', placeholder: 'Alert details…' },
        { name: 'severity', label: 'Severity', placeholder: 'info / warning / danger' },
        { name: 'region', label: 'Region', placeholder: 'State / District' },
        { name: 'validFrom', label: 'Valid From', required: true, type: 'datetime-local' },
        { name: 'validUntil', label: 'Valid Until', required: true, type: 'datetime-local' }
      ]}
      renderItem={a => <><p className="text-sm font-medium text-gray-800">{a.title}</p><p className="text-xs text-gray-500">{a.severity} — {a.region}</p></>}
    />,

    mandi: <ContentTab
      endpoint="/admin/mandi"
      listKey="entries"
      fields={[
        { name: 'mandiName', label: 'Mandi Name', required: true, placeholder: 'Azadpur Mandi' },
        { name: 'state', label: 'State', required: true, placeholder: 'Delhi' },
        { name: 'district', label: 'District', placeholder: 'North Delhi' },
        { name: 'commodity', label: 'Commodity', required: true, placeholder: 'Wheat' },
        { name: 'variety', label: 'Variety', placeholder: 'HD-2967' },
        { name: 'minPrice', label: 'Min Price (₹)', required: true, type: 'number', placeholder: '1800' },
        { name: 'maxPrice', label: 'Max Price (₹)', required: true, type: 'number', placeholder: '2200' },
        { name: 'modalPrice', label: 'Modal Price (₹)', required: true, type: 'number', placeholder: '2000' },
        { name: 'unit', label: 'Unit', placeholder: 'Quintal' },
        { name: 'reportDate', label: 'Report Date', required: true, type: 'date' }
      ]}
      renderItem={m => <><p className="text-sm font-medium text-gray-800">{m.commodity} — {m.mandiName}</p><p className="text-xs text-gray-500">Modal: ₹{m.modalPrice} / {m.unit} | {new Date(m.reportDate).toLocaleDateString()}</p></>}
    />,

    news: <ContentTab
      endpoint="/resources"
      listKey="resources"
      fields={[
        { name: 'title', label: 'News Title', required: true, placeholder: 'Title' },
        { name: 'category', label: 'Category', required: true, placeholder: 'News' },
        { name: 'description', label: 'Content', required: true, type: 'textarea', placeholder: 'News content…' },
        { name: 'imageUrl', label: 'Image URL', placeholder: 'https://…' }
      ]}
      renderItem={n => <><p className="text-sm font-medium text-gray-800 truncate">{n.title}</p><p className="text-xs text-gray-500">{n.category}</p></>}
    />,

    crops: <ContentTab
      endpoint="/crops"
      listKey="crops"
      fields={[
        { name: 'name', label: 'Crop Name', required: true, placeholder: 'Wheat' },
        { name: 'scientificName', label: 'Scientific Name', placeholder: 'Triticum aestivum' },
        { name: 'briefDescription', label: 'Brief Description', type: 'textarea', placeholder: 'Short description…' },
        { name: 'category', label: 'Category', placeholder: 'CEREALS' },
        { name: 'climate', label: 'Climate', placeholder: 'Cool & dry' },
        { name: 'soil', label: 'Soil Type', placeholder: 'Loamy, well-drained' },
        { name: 'imageUrl', label: 'Image URL', placeholder: 'https://…' }
      ]}
      renderItem={c => <><p className="text-sm font-medium text-gray-800">{c.name}</p><p className="text-xs text-gray-500">{c.category}</p></>}
    />
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-xl font-bold">🌿 Krishi Sahayak — Admin Panel</h1>
          <p className="text-xs text-green-200">Logged in as {user?.email}</p>
        </div>
        <button onClick={logout} className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-sm font-medium">Logout</button>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <nav className="w-56 bg-white border-r border-gray-200 flex-shrink-0 py-4">
          {TAB_CONFIG.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${tab === t.key ? 'bg-green-50 text-green-800 border-r-2 border-green-600' : 'text-gray-600 hover:bg-gray-50'}`}>
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-5">{TAB_CONFIG.find(t => t.key === tab)?.label}</h2>
          {TAB_CONTENT[tab]}
        </main>
      </div>
    </div>
  );
}
