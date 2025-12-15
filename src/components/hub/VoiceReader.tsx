"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2, Loader2 } from "lucide-react";
import { cleanMarkdown } from "@/src/lib/clean-text";

interface VoiceReaderProps {
  content: string;
  lang: string;
}

export default function VoiceReader({ content, lang }: VoiceReaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isVoicesLoaded, setIsVoicesLoaded] = useState(false);
  
  const synth = useRef<SpeechSynthesis | null>(null);
  const sentencesRef = useRef<string[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const plainText = cleanMarkdown(content);

  useEffect(() => {
    setMounted(true);

    // Cümlelere bölme mantığı
    const chunks = plainText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [plainText];
    sentencesRef.current = chunks;

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synth.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setAvailableVoices(voices);
          setIsVoicesLoaded(true);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, [plainText]);

  // --- KRİTİK DÜZELTME: KATI SES SEÇİMİ ---
  const getBestVoice = useCallback(() => {
    if (availableVoices.length === 0) return null;

    // Hedef dil (tr ise 'tr', en ise 'en')
    const targetLangCode = lang === 'tr' ? 'tr' : lang;

    // 1. Sadece hedef dili destekleyen sesleri filtrele
    const langVoices = availableVoices.filter(v => 
        v.lang.toLowerCase().includes(targetLangCode) || 
        v.lang.replace('_', '-').toLowerCase().startsWith(targetLangCode)
    );

    if (langVoices.length === 0) {
        // Eğer o dilde hiç ses yoksa null dön (Tarayıcı varsayılanına bırak)
        // ASLA İngilizce sesi zorla seçtirme!
        return null;
    }

    // 2. Türkçe sesler içinde "Google" olan varsa onu seç (Daha kalitelidir)
    const googleVoice = langVoices.find(v => v.name.toLowerCase().includes("google"));
    if (googleVoice) return googleVoice;

    // 3. Google yoksa, sistemdeki herhangi bir Türkçe sesi seç
    return langVoices[0];

  }, [availableVoices, lang]);


  const speakSentence = (index: number) => {
    if (!synth.current || index >= sentencesRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentenceIndex(0);
      return;
    }

    synth.current.cancel();

    const sentence = sentencesRef.current[index];
    if (!sentence || sentence.trim().length < 2) {
        speakSentence(index + 1);
        return;
    }

    const u = new SpeechSynthesisUtterance(sentence);
    const voice = getBestVoice();
    
    // Sesi ata
    if (voice) {
        u.voice = voice;
    }

    // Dil ayarını zorla
    u.lang = lang === 'tr' ? 'tr-TR' : 'en-US';
    
    // Türkçe karakterlerin anlaşılması için hızı biraz düşür
    u.rate = lang === 'tr' ? 0.9 : 1.0; 
    u.pitch = 1.0; 
    u.volume = 1.0;

    u.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    u.onend = () => {
      if (synth.current?.speaking === false && !synth.current?.paused) {
          setCurrentSentenceIndex(prev => {
              const next = prev + 1;
              speakSentence(next);
              return next;
          });
      }
    };

    u.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.error("Hata:", e);
          setIsPlaying(false);
      }
    };

    utteranceRef.current = u;
    synth.current.speak(u);
  };

  // --- KONTROLLER ---
  const handlePlay = () => {
    if (!synth.current) return;
    speakSentence(currentSentenceIndex);
  };

  const handlePause = () => {
    if (synth.current) {
      synth.current.cancel();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (synth.current) {
      synth.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentSentenceIndex(0);
    }
  };

  if (!mounted) return null;

  if (!isVoicesLoaded && typeof window !== 'undefined') {
     return (
        <div className="flex items-center gap-2 p-4 my-6 bg-slate-800/50 rounded-lg border border-white/10 w-fit backdrop-blur-sm">
             <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
             <span className="text-xs text-gray-400">Sesler yükleniyor...</span>
        </div>
     )
  }

  const progress = Math.round(((currentSentenceIndex) / sentencesRef.current.length) * 100);
  // Kullanıcıya hangi sesi kullandığımızı gösterelim (Debug için iyi olur)
  const activeVoiceName = getBestVoice()?.name || 'Sistem Varsayılanı';

  return (
    <div className="flex flex-col gap-2 p-4 my-6 bg-slate-800/50 rounded-lg border border-white/10 w-full sm:w-fit backdrop-blur-sm shadow-xl transition-all hover:bg-slate-800/70">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-500/10 rounded-full">
            {isPlaying ? (
                <Volume2 className="w-6 h-6 text-blue-400 animate-pulse" />
            ) : (
                <Volume2 className="w-6 h-6 text-blue-400" />
            )}
        </div>
        
        <div className="flex flex-col mr-4 min-w-[120px]">
            <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
            {lang === 'tr' ? 'Makaleyi Dinle' : 'Listen Article'}
            </span>
            <span className="text-[10px] text-gray-400 max-w-[180px] truncate" title={activeVoiceName}>
             {progress}% • {activeVoiceName}
            </span>
        </div>

        <div className="flex items-center gap-1">
            {(!isPlaying) && (
                <button 
                    onClick={handlePlay} 
                    className="p-2 hover:bg-blue-500/20 rounded-md transition-colors text-white bg-blue-500/10"
                    title="Oynat"
                >
                    <Play className="w-5 h-5 fill-current" />
                </button>
            )}

            {isPlaying && (
                <button 
                    onClick={handlePause} 
                    className="p-2 hover:bg-white/10 rounded-md transition-colors text-white bg-white/5"
                    title="Duraklat"
                >
                    <Pause className="w-5 h-5 fill-current" />
                </button>
            )}

            <button 
                onClick={handleStop} 
                className="p-2 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                title="Başa Dön"
            >
                <RotateCcw className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
        <div 
            className="h-full bg-blue-500/50 transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}