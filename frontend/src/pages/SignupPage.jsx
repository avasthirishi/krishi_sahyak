import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Step = ({ n, label, active, done }) => (
  <div className="flex flex-col items-center gap-1 flex-1">
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
      ${done ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
        : active ? 'bg-green-700 text-white ring-4 ring-green-200 shadow-md'
        : 'bg-gray-100 text-gray-400 border border-gray-200'}`}>
      {done ? '✓' : n}
    </div>
    <span className={`text-xs font-medium tracking-wide ${active || done ? 'text-green-800' : 'text-gray-400'}`}>{label}</span>
  </div>
);
const StepConnector = ({ done }) => (
  <div className={`h-0.5 flex-1 mt-4 rounded transition-all duration-500 ${done ? 'bg-emerald-400' : 'bg-gray-200'}`} />
);
const Field = ({ label, id, children }) => (
  <div>
    <label htmlFor={id} className="block mb-1.5 text-sm font-semibold text-green-950">{label}</label>
    {children}
  </div>
);
const inputCls = "w-full px-4 py-3 border border-green-200 rounded-xl bg-white/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition";

function SignupPage({ onSignup }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = details, 2 = verify email, 3 = done

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', city: '', state: '', password: '', role: 'FARMER'
  });
  const [showPass, setShowPass] = useState(false);
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', ok: false });

  const showMsg = (text, ok = false) => setMessage({ text, ok });
  const clearMsg = () => setMessage({ text: '', ok: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') { setEmailVerified(false); setOtp(''); setDevOtp(''); }
    setFormData(p => ({ ...p, [name]: value }));
  };

  // ── Step 1 → send OTP ─────────────────────────────────────────────────────────
  const handleStep1 = async (e) => {
    e.preventDefault();
    clearMsg();
    if (!formData.fullName || !formData.email || !formData.password) {
      showMsg('Please fill Full Name, Email and Password first.'); return;
    }
    if (formData.password.length < 6) { showMsg('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = await authAPI.sendRegistrationOtp(formData.email);
      const d = res.data?.devOtp || '';
      setDevOtp(d);
      if (d) setOtp(d);
      showMsg(res.message || 'OTP sent to your email.', true);
      setStep(2);
    } catch (err) {
      showMsg(err.response?.data?.message || 'Could not send OTP. Check your email and try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2 → verify OTP ───────────────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    clearMsg();
    if (otp.length !== 6) { showMsg('Enter the 6-digit OTP.'); return; }
    setLoading(true);
    try {
      const res = await authAPI.verifyRegistrationOtp(formData.email, otp);
      setEmailVerified(true);
      showMsg(res.message || 'Email verified!', true);
      // Immediately proceed to register
      await handleRegister();
    } catch (err) {
      showMsg(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await authAPI.register(formData);
      showMsg('Account created! Redirecting…', true);
      setStep(3);
      if (onSignup) onSignup(res.data.user);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      showMsg(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleResend = async () => {
    clearMsg(); setOtp(''); setLoading(true);
    try {
      const res = await authAPI.sendRegistrationOtp(formData.email);
      const d = res.data?.devOtp || '';
      setDevOtp(d);
      if (d) setOtp(d);
      showMsg(res.message || 'OTP resent.', true);
    } catch (err) {
      showMsg(err.response?.data?.message || 'Could not resend OTP.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="glass-card p-8 md:p-10">

          {/* Brand */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-700 to-emerald-500 shadow-lg shadow-emerald-200 mb-3">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-green-900">Create Account</h1>
            <p className="text-sm text-green-700/70 mt-1">Join Krishi Sahayak with secure email verification</p>
          </div>

          {/* Steps */}
          <div className="flex items-center mb-8">
            <Step n={1} label="Details" active={step === 1} done={step > 1} />
            <StepConnector done={step > 1} />
            <Step n={2} label="Verify Email" active={step === 2} done={step > 2} />
            <StepConnector done={step > 2} />
            <Step n={3} label="Done" active={step === 3} done={false} />
          </div>

          {/* ── Step 1: user details ─────────────────────────────────────── */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-4">
              <Field label="Full Name *" id="fullName">
                <input id="fullName" name="fullName" type="text" value={formData.fullName}
                  onChange={handleChange} disabled={loading} required placeholder="Ravi Kumar"
                  className={inputCls} />
              </Field>

              <Field label="Email Address *" id="email">
                <input id="email" name="email" type="email" value={formData.email}
                  onChange={handleChange} disabled={loading} required placeholder="you@example.com"
                  className={inputCls} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Phone" id="phone">
                  <input id="phone" name="phone" type="tel" value={formData.phone}
                    onChange={handleChange} disabled={loading} placeholder="+91 …"
                    className={inputCls} />
                </Field>
                <Field label="I am a" id="role">
                  <select id="role" name="role" value={formData.role}
                    onChange={handleChange} disabled={loading}
                    className={inputCls}>
                    <option value="FARMER">Farmer</option>
                    <option value="RESEARCHER">Researcher</option>
                    <option value="MANDI_OWNER">Mandi Owner</option>
                    <option value="LAB_OWNER">Lab Owner</option>
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="City" id="city">
                  <input id="city" name="city" type="text" value={formData.city}
                    onChange={handleChange} disabled={loading} placeholder="Lucknow"
                    className={inputCls} />
                </Field>
                <Field label="State" id="state">
                  <input id="state" name="state" type="text" value={formData.state}
                    onChange={handleChange} disabled={loading} placeholder="Uttar Pradesh"
                    className={inputCls} />
                </Field>
              </div>

              <Field label="Password * (min 6 chars)" id="password">
                <div className="relative">
                  <input id="password" name="password" type={showPass ? 'text' : 'password'}
                    value={formData.password} onChange={handleChange} disabled={loading}
                    required minLength={6} placeholder="••••••••"
                    className={`${inputCls} pr-12`} />
                  <button type="button" onClick={() => setShowPass(v => !v)} tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700 transition">
                    {showPass
                      ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    }
                  </button>
                </div>
              </Field>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-700 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-800 hover:to-emerald-700 disabled:opacity-60 transition-all shadow-md shadow-emerald-200/60 focus:outline-none focus:ring-2 focus:ring-green-400">
                {loading
                  ? <span className="flex items-center justify-center gap-2"><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Sending OTP…</span>
                  : 'Continue — Send OTP'}
              </button>

              <p className="text-center text-sm text-green-800/70">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-green-700 hover:underline">Login</Link>
              </p>
            </form>
          )}

          {/* ── Step 2: verify OTP ───────────────────────────────────────── */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {devOtp ? (
                /* SMTP not configured – show OTP prominently */
                <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">Email delivery unavailable — use this OTP</p>
                  <button
                    type="button"
                    onClick={() => setOtp(devOtp)}
                    className="font-mono text-3xl font-bold tracking-[0.3em] text-amber-800 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl transition border border-amber-300"
                    title="Click to fill OTP"
                  >
                    {devOtp}
                  </button>
                  <p className="text-xs text-amber-600 mt-2">Click the code above to fill it automatically</p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
                  <p className="text-sm text-emerald-800 font-medium text-center">
                    OTP sent to <span className="font-bold">{formData.email}</span>
                  </p>
                </div>
              )}

              <Field label="Enter 6-digit OTP" id="otp">
                <input id="otp" type="text" inputMode="numeric"
                  value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  disabled={loading} placeholder="_ _ _ _ _ _" maxLength={6} required
                  className={`${inputCls} text-center text-2xl font-mono tracking-[0.5em]`} />
              </Field>

              <button type="submit" disabled={loading || otp.length !== 6}
                className="w-full py-3 bg-gradient-to-r from-green-700 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-800 hover:to-emerald-700 disabled:opacity-60 transition-all shadow-md shadow-emerald-200/60 focus:outline-none focus:ring-2 focus:ring-green-400">
                {loading
                  ? <span className="flex items-center justify-center gap-2"><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Verifying…</span>
                  : 'Verify & Create Account'}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button type="button" onClick={() => { setStep(1); clearMsg(); setOtp(''); setDevOtp(''); }}
                  className="text-green-700 hover:underline">← Back</button>
                <button type="button" onClick={handleResend} disabled={loading}
                  className="text-green-700 hover:underline disabled:opacity-50">Resend OTP</button>
              </div>
            </form>
          )}

          {/* ── Step 3: success ──────────────────────────────────────────── */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl mb-2">✓</div>
              <h3 className="text-xl font-bold text-green-900">You're all set!</h3>
              <p className="text-green-700/80 text-sm">Your account has been created. Redirecting to home…</p>
            </div>
          )}

          {/* Message bar */}
          {message.text && (
            <div className={`mt-5 px-4 py-3 rounded-xl text-sm font-medium text-center transition-all ${message.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

