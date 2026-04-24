import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Languages, 
  BookOpen, 
  Volume2, 
  SearchX,
  Sparkles,
  Info,
  ExternalLink
} from 'lucide-react';

// --- Types ---

interface Word {
  id: number;
  armenian: string;
  spanish: string;
  german: string;
  tags: string[];
}

// --- Data ---

const WORDS: Word[] = [
  { id: 1, armenian: "Կիթառ", spanish: "Guitarra", german: "Gitarre", tags: ["երաժշտություն", "music"] },
  { id: 2, armenian: "Օպերա", spanish: "Ópera", german: "Oper", tags: ["երաժշտություն", "art"] },
  { id: 3, armenian: "Թատրոն", spanish: "Teatro", german: "Theater", tags: ["art", "culture"] },
  { id: 4, armenian: "Համալսարան", spanish: "Universidad", german: "Universität", tags: ["կրթություն", "education"] },
  { id: 5, armenian: "Խնդիր (Պրոբլեմ)", spanish: "Problema", german: "Problem", tags: ["general"] },
  { id: 6, armenian: "Երաժշտություն", spanish: "Música", german: "Musik", tags: ["երաժշտություն", "general"] },
  { id: 7, armenian: "Տեքստ", spanish: "Texto", german: "Text", tags: ["general", "writing"] },
  { id: 8, armenian: "Ֆոտո / Լուսանկար", spanish: "Foto", german: "Foto", tags: ["art", "technology"] },
  { id: 9, armenian: "Տաքսի", spanish: "Taxi", german: "Taxi", tags: ["transport"] },
  { id: 10, armenian: "Բանան", spanish: "Plátano / Banana", german: "Banane", tags: ["սնունդ", "food"] },
  { id: 11, armenian: "Թեմա", spanish: "Tema", german: "Thema", tags: ["general"] },
  { id: 12, armenian: "Կոնտակտ", spanish: "Contacto", german: "Kontakt", tags: ["general", "social"] },
  { id: 13, armenian: "Դասարան / Կլաս", spanish: "Clase", german: "Klasse", tags: ["կրթություն", "education"] },
  { id: 14, armenian: "Տելեգրամ", spanish: "Telegrama", german: "Telegramm", tags: ["general", "social"] },
  { id: 15, armenian: "Ինֆորմացիա", spanish: "Información", german: "Information", tags: ["general", "knowledge"] },
  { id: 16, armenian: "Օվկիանոս", spanish: "Océano", german: "Ozean", tags: ["բնություն", "nature"] },
  { id: 17, armenian: "Բնություն", spanish: "Naturaleza", german: "Natur", tags: ["բնություն", "nature"] },
  { id: 18, armenian: "Պլան", spanish: "Plan", german: "Plan", tags: ["general"] }
];

const speak = (text: string, lang: 'es-ES' | 'de-DE') => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

export default function MultilingualDictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const filteredWords = WORDS.filter(w => 
    w.armenian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.spanish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.german.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fffbeb] text-slate-900 font-sans selection:bg-red-100 selection:text-red-900">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-yellow-400 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 opacity-40" />
         <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-red-400 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 opacity-20" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-3xl border-b border-orange-100 px-6 py-6 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-orange-500 rounded-[22px] flex items-center justify-center text-white shadow-2xl shadow-orange-200">
                <BookOpen size={28} />
             </div>
             <div>
                <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">Բառարան</h1>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-orange-600/50">Multilingual • {WORDS.length} Words</p>
             </div>
          </div>

          <div className="relative group max-w-lg w-full">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
             <input 
               type="text" 
               placeholder="Որոնել..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-14 pr-6 py-4 bg-white border border-orange-100 rounded-[25px] focus:bg-white focus:border-orange-300 transition-all outline-none text-slate-800 font-bold placeholder:text-slate-300 shadow-sm"
             />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Sidebar / List */}
        <div className="lg:col-span-4 xl:col-span-3 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
           <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-6 px-4">Ցանկ</p>
              <AnimatePresence mode="popLayout">
                {filteredWords.length > 0 ? (
                  filteredWords.map((word) => (
                    <motion.button
                      key={word.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setSelectedWord(word)}
                      className={`w-full text-left p-5 rounded-[30px] transition-all border-2 ${
                        selectedWord?.id === word.id 
                          ? 'bg-white border-red-500 scale-102 shadow-2xl shadow-red-200/50' 
                          : 'bg-white border-white hover:border-orange-200 text-slate-900 shadow-sm'
                      }`}
                    >
                       <div className={`font-black text-lg italic tracking-tighter ${selectedWord?.id === word.id ? 'text-red-600' : 'text-slate-900'}`}>
                          {word.armenian}
                       </div>
                       <div className={`text-[10px] font-bold flex items-center justify-between mt-2 uppercase tracking-widest ${selectedWord?.id === word.id ? 'text-red-300' : 'text-slate-400'}`}>
                          <span id={`spanish-list-${word.id}`}>{word.spanish.split(' / ')[0]}</span>
                          <span className="opacity-20">•</span>
                          <span className="text-red-500" id={`german-list-${word.id}`}>{word.german}</span>
                       </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="py-20 text-center space-y-4 text-slate-300">
                     <SearchX size={48} className="mx-auto" />
                     <p className="text-xs font-black uppercase tracking-widest">Դատարկ է</p>
                  </div>
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8 xl:col-span-9">
           <AnimatePresence mode="wait">
              {selectedWord ? (
                <motion.div 
                  key={selectedWord.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/60 backdrop-blur-3xl rounded-[3rem] border border-orange-100 shadow-2xl overflow-hidden flex flex-col h-full"
                >
                   {/* Card Header */}
                   <div className="p-12 text-slate-900 border-b border-orange-50">
                      <div className="space-y-4">
                         <div className="flex items-center gap-3 text-orange-400 font-black uppercase tracking-[0.4em] text-[10px]">
                            <Sparkles size={16} /> Selected Word
                         </div>
                         <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">{selectedWord.armenian}</h2>
                      </div>
                   </div>

                   {/* Mirror Layout */}
                   <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                      
                      {/* Spanish - Left */}
                      <div className="group p-10 bg-white rounded-[2.5rem] flex flex-col justify-between shadow-2xl border-b-[12px] border-red-100">
                         <div className="flex items-center justify-between mb-10">
                            <div className="flex flex-col gap-1">
                               <span className="text-[10px] font-black uppercase tracking-wider text-red-200">Idioma</span>
                               <span className="px-4 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Español</span>
                            </div>
                            <button 
                              onClick={() => speak(selectedWord.spanish, 'es-ES')}
                              className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white hover:-rotate-6 transition-all shadow-lg"
                            >
                               <Volume2 size={32} />
                            </button>
                         </div>
                         <div className="text-5xl md:text-6xl font-black text-red-600 italic tracking-tighter mb-4 leading-none break-words">
                            {selectedWord.spanish}
                         </div>
                      </div>

                      {/* German - Right */}
                      <div className="group p-10 bg-white rounded-[2.5rem] flex flex-col justify-between shadow-2xl border-b-[12px] border-slate-200">
                         <div className="flex items-center justify-between mb-10">
                            <div className="flex flex-col gap-1" id="german-lang-label">
                               <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">Sprache</span>
                               <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Deutsch</span>
                            </div>
                            <button 
                              id="speak-german-btn"
                              onClick={() => speak(selectedWord.german, 'de-DE')}
                              className="w-16 h-16 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center hover:bg-slate-900 hover:text-white hover:rotate-6 transition-all shadow-lg"
                            >
                               <Volume2 size={32} />
                            </button>
                         </div>
                         <div className="text-5xl md:text-6xl font-black text-red-600 italic tracking-tighter mb-4 leading-none break-words" id="german-word-display">
                            {selectedWord.german}
                         </div>
                      </div>

                   </div>

                   {/* Footer Info */}
                   <div className="px-12 py-8 bg-white/40 flex flex-wrap items-center gap-4 border-t border-orange-50">
                      <div className="flex items-center gap-2 text-slate-300">
                         <Info size={14} />
                         <span className="text-[10px] font-black uppercase tracking-widest">TAGS:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedWord.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-orange-100/50 text-orange-600 text-[10px] font-black uppercase rounded-xl border border-orange-200/50 tracking-widest">
                            #{tag}
                          </span>
                        ))}
                      </div>
                   </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white/40 backdrop-blur-3xl rounded-[3rem] border-2 border-dashed border-orange-100">
                   <div className="w-32 h-32 bg-orange-500/10 rounded-[40px] flex items-center justify-center text-orange-500/20 mb-8 border border-orange-100">
                      <Languages size={64} />
                   </div>
                   <div className="space-y-6">
                      <h3 className="text-4xl font-black italic text-slate-800 uppercase tracking-tighter uppercase tracking-widest">Ընտրեք բառ</h3>
                      <p className="text-slate-400 font-bold max-w-sm text-sm mx-auto">
                        Սեղմեք ցանկի ցանկացած բառի վրա՝ թարգմանությունը տեսնելու համար:
                      </p>
                   </div>
                </div>
              )}
           </AnimatePresence>
        </div>
      </main>

      <footer className="p-12 text-center opacity-40 select-none">
         <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-400">Polyglot Dictionary v3.0</p>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
          background-clip: padding-box;
        }
      `}</style>
    </div>
  );
}
