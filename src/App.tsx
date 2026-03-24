import React, { useState, useEffect, useRef, Component } from 'react';
import { useUser, SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Dna, Activity, Brain, FlaskConical, ChevronRight, LogIn, LogOut, Loader2, Pill, Microscope, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { cn } from './lib/utils';
import { GoogleGenAI } from "@google/genai";
import $ from 'jquery';
// @ts-ignore
window.$ = window.jQuery = $;
import * as $3Dmol from '3dmol';

// --- Error Boundary ---

// --- Components ---

const LoadingScreen = () => (
  <div className="h-screen w-full flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-sm font-medium text-gray-500 animate-pulse">Initializing ReMedAI...</p>
    </div>
  </div>
);

const ProteinViewer = ({ pdb }: { pdb: string }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewerRef.current && pdb) {
      // @ts-ignore
      const viewer = $3Dmol.createViewer(viewerRef.current, {
        backgroundColor: 'black',
      });
      
      try {
        viewer.addModel(pdb, "pdb");
        // Use 'spectrum' coloring which matches the rainbow gradient in the image
        // Adding thickness and high-quality rendering to match the image
        viewer.setStyle({}, { 
          cartoon: { 
            color: 'spectrum',
            thickness: 0.6,
            opacity: 1.0
          } 
        });
        viewer.zoomTo();
        viewer.render();
        viewer.spin(true);
      } catch (e) {
        console.error("3Dmol Error:", e);
      }
      
      return () => {
        viewer.clear();
      };
    }
  }, [pdb]);

  return (
    <div 
      ref={viewerRef} 
      className="w-full h-full min-h-[400px] relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl bg-black"
    />
  );
};

const Features = () => (
  <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
        <Dna size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3">Structure Prediction</h3>
      <p className="text-gray-600">Utilize ESMFold to predict high-resolution 3D protein structures from sequences.</p>
    </div>
    <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
        <FlaskConical size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3">Drug Repurposing</h3>
      <p className="text-gray-600">Identify existing FDA-approved drugs that could potentially target new diseases.</p>
    </div>
    <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
        <Brain size={24} />
      </div>
      <h3 className="text-xl font-bold mb-3">AI Reasoning</h3>
      <p className="text-gray-600">Get detailed explanations of binding mechanisms powered by Google Gemini.</p>
    </div>
  </section>
);

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
          <Activity size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900">ReMedAI</span>
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
              <LogIn size={16} /> Get Started
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <SignOutButton>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <LogOut size={16} /> Sign Out
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <section ref={heroRef} className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6"
      >
        <Microscope size={14} /> Next-Gen Drug Discovery
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
        AI-Powered <span className="text-blue-600">Drug Repurposing</span> <br /> 
        using Protein Intelligence
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
        Accelerate medical research by predicting protein structures and identifying potential drug candidates with advanced AI models.
      </p>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 mx-auto group">
            Start Analyzing <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col items-center gap-4">
          <div className="px-6 py-3 rounded-2xl bg-green-50 text-green-700 font-bold flex items-center gap-2">
            <Activity size={18} /> You are signed in
          </div>
          <p className="text-gray-500 text-sm">Scroll down to access your dashboard</p>
        </div>
      </SignedIn>
    </section>
  );
};

const Dashboard = () => {
  const [inputType, setInputType] = useState<'disease' | 'sequence'>('disease');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputValue) return;
    setLoading(true);
    setError(null);
    try {
      // 1. Call Backend for Structure and Drugs
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [inputType === 'disease' ? 'disease' : 'proteinSequence']: inputValue,
        }),
      });
      
      if (!response.ok) throw new Error("Failed to analyze structure. Please check your connection.");
      
      const data = await response.json();
      
      // 2. Call Gemini for Explanation (Frontend)
      let explanation = "Analysis complete. The protein structure has been predicted and potential drug candidates have been identified.";
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const genAI = new GoogleGenAI({ apiKey });
          const result = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Explain how a drug could bind to this protein structure (Sequence: ${data.sequence}) and why it may be effective for treating ${inputType === 'disease' ? inputValue : 'the target condition'}. Keep it simple, professional, and medically informative. Focus on binding reasoning.`
          });
          explanation = result.text || explanation;
        } catch (geminiError) {
          console.error("Gemini Error:", geminiError);
          explanation = "Structure predicted successfully, but AI explanation failed to generate. " + (geminiError instanceof Error ? geminiError.message : "");
        }
      } else {
        explanation = "Structure predicted successfully. (AI Explanation unavailable: GEMINI_API_KEY not found)";
      }

      setResult({ ...data, explanation });
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700"
        >
          <AlertCircle size={20} />
          <span className="font-medium">{error}</span>
        </motion.div>
      )}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden mb-10">
        <div className="p-8 border-b border-gray-50 bg-gray-50/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analyze Target</h2>
          <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-2xl w-fit mb-6">
            <button 
              onClick={() => setInputType('disease')}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                inputType === 'disease' ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900"
              )}
            >
              Disease Name
            </button>
            <button 
              onClick={() => setInputType('sequence')}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                inputType === 'sequence' ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-900"
              )}
            >
              Protein Sequence
            </button>
          </div>
          
          <div className="relative">
            {inputType === 'disease' ? (
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g. Alzheimer's, Diabetes, Cancer..."
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-lg"
              />
            ) : (
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter protein sequence (FASTA format)..."
                rows={4}
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-lg font-mono"
              />
            )}
            <button 
              onClick={handleAnalyze}
              disabled={loading || !inputValue}
              className="mt-6 w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
              {loading ? "Analyzing Structure..." : "Run Analysis"}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Protein Structure Card */}
            <div className="bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-900/30 text-purple-400 rounded-xl flex items-center justify-center">
                  <Dna size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">3D Protein Structure</h3>
              </div>
              <div className="h-[400px] w-full">
                <ProteinViewer pdb={result.pdb} />
              </div>
              <p className="mt-4 text-sm text-gray-400 italic">
                * Predicted 3D structure. Drag to rotate, scroll to zoom.
              </p>
            </div>

            {/* Suggested Drugs Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <Pill size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Suggested Drugs</h3>
              </div>
              <div className="space-y-4">
                {result.drugs.map((drug: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <FlaskConical className="text-gray-400" size={18} />
                      <span className="font-bold text-gray-800">{drug.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${drug.score * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-blue-600">{Math.round(drug.score * 100)}% Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Explanation Card */}
            <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Brain size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI Analysis & Reasoning</h3>
              </div>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                {result.explanation.split('\n').map((para: string, i: number) => (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

// --- Main App ---

const MainContent = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // If Clerk takes too long to load (e.g. blocked by browser/iframe issues),
    // show the public content so the app isn't stuck on a loading screen.
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setShowFallback(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  if (!isLoaded && !showFallback) return <LoadingScreen />;

  // If we are signed in, or if Clerk loaded and we are signed out,
  // or if we timed out (in which case we show public content).
  return (
    <main>
      {isSignedIn ? (
        <Dashboard />
      ) : (
        <>
          <Hero />
          <Features />
        </>
      )}
    </main>
  );
};

const PublicContent = () => {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
};

export default function App() {
  const isClerkKeyMissing = !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isGeminiKeyMissing = !process.env.GEMINI_API_KEY;

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      {(isClerkKeyMissing || isGeminiKeyMissing) && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl shadow-lg flex gap-3">
            <AlertCircle className="text-amber-600 shrink-0" size={20} />
            <div>
              <h4 className="text-sm font-bold text-amber-900 mb-1">Configuration Required</h4>
              <p className="text-xs text-amber-700 leading-relaxed">
                Please set your {isClerkKeyMissing && "Clerk"} {isClerkKeyMissing && isGeminiKeyMissing && "and"} {isGeminiKeyMissing && "Gemini"} API keys in the Secrets panel to enable all features.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isClerkKeyMissing ? <MainContent /> : <PublicContent />}

      <footer className="py-10 px-6 border-t border-gray-100 text-center text-gray-400 text-sm">
        &copy; 2026 ReMedAI Drug Repurposing Platform. Powered by NVIDIA NIM & Google Gemini.
      </footer>
    </div>
  );
}
