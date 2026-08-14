import React, { useState } from 'react';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CURRENT_MONTH = new Date().getMonth();

const CALENDAR_DATA = [
  { crop: 'Wheat',      emoji: '🌾', category: 'Cereal',    sow: [9,10],       harvest: [2,3],       season: 'Rabi',   tip: 'Sow after monsoon recedes. Requires cool weather for grain fill.' },
  { crop: 'Rice',       emoji: '🍚', category: 'Cereal',    sow: [5,6],        harvest: [9,10],      season: 'Kharif', tip: 'Transplant 25-day-old seedlings. Maintain 5cm standing water.' },
  { crop: 'Maize',      emoji: '🌽', category: 'Cereal',    sow: [5,6,10,11],  harvest: [8,9,1,2],   season: 'Both',   tip: 'Well-drained loamy soil. Avoid waterlogging at all stages.' },
  { crop: 'Sugarcane',  emoji: '🎋', category: 'Cash',      sow: [1,2,9,10],   harvest: [10,11,12],  season: 'Both',   tip: 'Ratoon crop saves cost. Apply trash mulching to conserve moisture.' },
  { crop: 'Cotton',     emoji: '☁️', category: 'Cash',      sow: [4,5,6],      harvest: [9,10,11],   season: 'Kharif', tip: 'Deep black soil preferred. Bollworm is the main pest threat.' },
  { crop: 'Soybean',    emoji: '🫘', category: 'Oilseed',   sow: [5,6],        harvest: [9,10],      season: 'Kharif', tip: 'Inoculate seeds with Rhizobium. Short-day plant — critical for photoperiod.' },
  { crop: 'Mustard',    emoji: '🌼', category: 'Oilseed',   sow: [9,10],       harvest: [1,2],       season: 'Rabi',   tip: 'Sow in October for best oil content. Aphid control is critical.' },
  { crop: 'Groundnut',  emoji: '🥜', category: 'Oilseed',   sow: [5,6],        harvest: [9,10],      season: 'Kharif', tip: 'Light, sandy loam soil. Gypsum application improves pod filling.' },
  { crop: 'Onion',      emoji: '🧅', category: 'Vegetable', sow: [10,11,12],   harvest: [2,3,4],     season: 'Rabi',   tip: 'Avoid waterlogging. Reduce irrigation 15 days before harvest.' },
  { crop: 'Tomato',     emoji: '🍅', category: 'Vegetable', sow: [10,11,5,6],  harvest: [1,2,3,8,9], season: 'Both',   tip: 'Stake plants at 30cm height. Use drip irrigation to prevent fruit cracking.' },
  { crop: 'Potato',     emoji: '🥔', category: 'Vegetable', sow: [9,10],       harvest: [12,0,1],    season: 'Rabi',   tip: 'Certified seed tubers give 20-30% higher yield. Hill up at 30 days.' },
  { crop: 'Brinjal',    emoji: '🍆', category: 'Vegetable', sow: [0,1,5,6],    harvest: [3,4,5,8,9], season: 'Both',   tip: 'Transplant at 5-6 leaf stage. Shoot and fruit borer is major pest.' },
  { crop: 'Turmeric',   emoji: '🟡', category: 'Spice',     sow: [3,4],        harvest: [0,1],       season: 'Kharif', tip: 'Raised beds with good drainage. Boil and dry rhizomes for 8-10 hours.' },
  { crop: 'Ginger',     emoji: '🫚', category: 'Spice',     sow: [3,4,5],      harvest: [10,11,12],  season: 'Kharif', tip: 'Shade-loving crop. Treat seed rhizomes with Mancozeb before planting.' },
  { crop: 'Chickpea',   emoji: '🫘', category: 'Pulse',     sow: [9,10],       harvest: [1,2],       season: 'Rabi',   tip: 'Deep-rooted — drought-tolerant once established. Wilt is major disease.' },
  { crop: 'Lentil',     emoji: '🫘', category: 'Pulse',     sow: [10,11],      harvest: [2,3],       season: 'Rabi',   tip: 'Low water requirement. Foliar spray of urea at flowering boosts yield.' },
];

const CATEGORIES = ['All', 'Cereal', 'Cash', 'Oilseed', 'Vegetable', 'Spice', 'Pulse'];
const SEASON_COLOR = { Kharif: 'bg-amber-100 text-amber-800', Rabi: 'bg-blue-100 text-blue-800', Both: 'bg-purple-100 text-purple-800' };

export default function CropCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH);
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = CALENDAR_DATA.filter(c => {
    const catOk = category === 'All' || c.category === category;
    return catOk;
  });

  const canSow     = filtered.filter(c => c.sow.includes(selectedMonth));
  const canHarvest = filtered.filter(c => c.harvest.includes(selectedMonth));

  return (
    <div className="page-container">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-4">📅 Farming Calendar</span>
        <h1 className="section-heading text-green-900 mb-2">Crop Sowing & Harvest Calendar</h1>
        <p className="text-gray-600 max-w-xl mx-auto">Know exactly what to sow and harvest every month across India.</p>
      </div>

      {/* Month selector */}
      <div className="glass-card p-4 mb-6 animate-slide-up">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">Select Month</p>
        <div className="flex flex-wrap justify-center gap-2">
          {MONTHS.map((m, i) => (
            <button key={m} onClick={() => setSelectedMonth(i)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedMonth === i ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-green-50'} ${i === CURRENT_MONTH ? 'ring-2 ring-green-400 ring-offset-1' : ''}`}>
              {m}
              {i === CURRENT_MONTH && <span className="ml-1 text-xs">●</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${category === c ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Sow */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-green-800 mb-4">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">🌱</span>
            Sow in {MONTHS[selectedMonth]} ({canSow.length})
          </h2>
          {canSow.length === 0 ? (
            <div className="glass-card p-6 text-center text-gray-500 text-sm">Nothing to sow this month in selected category.</div>
          ) : (
            <div className="space-y-3">
              {canSow.map(c => (
                <button key={c.crop} onClick={() => setSelected(c)} className="w-full glass-card p-4 flex items-center gap-3 text-left card-lift animate-fade-in">
                  <span className="text-3xl">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800">{c.crop}</p>
                    <p className="text-xs text-gray-500 truncate">{c.tip}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${SEASON_COLOR[c.season]}`}>{c.season}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Harvest */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-amber-700 mb-4">
            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm">🌾</span>
            Harvest in {MONTHS[selectedMonth]} ({canHarvest.length})
          </h2>
          {canHarvest.length === 0 ? (
            <div className="glass-card p-6 text-center text-gray-500 text-sm">Nothing to harvest this month in selected category.</div>
          ) : (
            <div className="space-y-3">
              {canHarvest.map(c => (
                <button key={c.crop} onClick={() => setSelected(c)} className="w-full glass-card p-4 flex items-center gap-3 text-left card-lift animate-fade-in">
                  <span className="text-3xl">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800">{c.crop}</p>
                    <p className="text-xs text-gray-500 truncate">{c.tip}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${SEASON_COLOR[c.season]}`}>{c.season}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Year-round overview table */}
      <div className="glass-card p-4 sm:p-6 animate-slide-up">
        <h2 className="text-lg font-bold text-gray-800 mb-4">📊 Year-Round Overview</h2>
        <div className="table-scroll">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="bg-green-50">
                <th className="text-left py-2 px-3 font-semibold text-gray-700 rounded-l-lg">Crop</th>
                {MONTHS.map((m, i) => (
                  <th key={m} className={`py-2 px-1 text-xs font-semibold text-center ${i === CURRENT_MONTH ? 'text-green-700 bg-green-100' : 'text-gray-500'}`}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, idx) => (
                <tr key={c.crop} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="py-2 px-3 font-medium text-gray-800">{c.emoji} {c.crop}</td>
                  {MONTHS.map((_, i) => {
                    const isSow     = c.sow.includes(i);
                    const isHarvest = c.harvest.includes(i);
                    return (
                      <td key={i} className="py-2 px-1 text-center">
                        {isSow     && <span title="Sow"     className="inline-block w-5 h-5 bg-green-500 rounded text-white text-xs leading-5">S</span>}
                        {isHarvest && <span title="Harvest" className="inline-block w-5 h-5 bg-amber-500 rounded text-white text-xs leading-5">H</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span><span className="inline-block w-4 h-4 bg-green-500 rounded mr-1 align-middle"></span>S = Sow</span>
          <span><span className="inline-block w-4 h-4 bg-amber-500 rounded mr-1 align-middle"></span>H = Harvest</span>
          <span className="ml-auto text-green-600 font-medium">● = Current month</span>
        </div>
      </div>

      {/* Crop detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{selected.emoji}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selected.crop}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{selected.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${SEASON_COLOR[selected.season]}`}>{selected.season}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2"><span className="text-green-600 font-semibold w-20 flex-shrink-0">🌱 Sow:</span><span className="text-gray-700">{selected.sow.map(i => MONTHS[i]).join(', ')}</span></div>
              <div className="flex gap-2"><span className="text-amber-600 font-semibold w-20 flex-shrink-0">🌾 Harvest:</span><span className="text-gray-700">{selected.harvest.map(i => MONTHS[i]).join(', ')}</span></div>
              <div className="bg-green-50 rounded-xl p-3 text-gray-700 leading-relaxed">💡 {selected.tip}</div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-5 w-full py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
