"use client";

import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { toast } from "sonner"; // Bildirim için sonner kullanıyoruz
import { sendEmail } from "@/src/lib/actions"; // Server action importu

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialPlan: string;
  mode: 'design' | 'code';
}

export function ContactModal({ isOpen, onOpenChange, initialPlan, mode }: ContactModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  // TEMA YAPILANDIRMASI
  const theme = mode === 'design' ? {
    gradientBg: "bg-gradient-to-br from-[#1a0b2e] via-[#2e1065] to-[#1a0b2e]",
    titleGradient: "bg-gradient-to-r from-purple-200 via-fuchsia-300 to-pink-300",
    border: "border-purple-500/20",
    inputBg: "bg-white/5 focus:bg-white/10",
    inputBorder: "border-white/10 focus:border-purple-500/50",
    ring: "focus:ring-purple-500/20",
    label: "text-purple-100/80",
    button: "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-purple-500/25",
    badge: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-500/30"
  } : {
    gradientBg: "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a]",
    titleGradient: "bg-gradient-to-r from-blue-200 via-cyan-300 to-teal-300",
    border: "border-blue-500/20",
    inputBg: "bg-white/5 focus:bg-white/10",
    inputBorder: "border-white/10 focus:border-blue-500/50",
    ring: "focus:ring-blue-500/20",
    label: "text-blue-100/80",
    button: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-500/25",
    badge: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30"
  };

  useEffect(() => {
    if (isOpen) {
      if (initialPlan.includes("Başlangıç") || initialPlan.includes("Basic") || initialPlan.includes("MVP")) {
        setSelectedPlan("baslangic");
      } else if (initialPlan.includes("Büyüme") || initialPlan.includes("Scale") || initialPlan.includes("Profesyonel")) {
        setSelectedPlan("buyume");
      } else if (initialPlan.includes("Kurumsal") || initialPlan.includes("Enterprise")) {
        setSelectedPlan("kurumsal");
      } else {
        setSelectedPlan("baslangic");
      }
    }
  }, [isOpen, initialPlan]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    e.target.setCustomValidity("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      plan: selectedPlan,
      mode: mode
    };

    try {
      const result = await sendEmail(payload);

      if (result.success) {
        toast.success("Başvurunuz Alındı! 🎉", {
          description: "En kısa sürede sizinle iletişime geçeceğiz.",
          duration: 5000,
        });
        
        // Formu temizle ve kapat
        setFormData({ name: "", phone: "", email: "", message: "" });
        onOpenChange(false);
      } else {
        toast.error("Bir hata oluştu", {
          description: "Lütfen daha sonra tekrar deneyin veya WhatsApp'tan yazın.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Bağlantı hatası oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLInputElement).setCustomValidity("Bu alanı doldurmalısınız");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`
          w-[95%] sm:max-w-[750px]
          rounded-2xl ${theme.gradientBg} ${theme.border} text-white shadow-2xl 
          p-5 sm:p-6 md:p-8 
          transition-all duration-500
        `}
      >
        <DialogHeader className="mb-1 sm:mb-2 space-y-1">
          <DialogTitle className={`text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent ${theme.titleGradient}`}>
            Projenizi Başlatalım
          </DialogTitle>
          <DialogDescription className="text-white/60 text-xs sm:text-sm">
            Hayalinizdeki projeyi gerçeğe dönüştürmek için detayları paylaşın.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          
          {/* 1. PLAN SEÇİMİ */}
          <div className="grid gap-1 md:col-span-2">
            <Label htmlFor="plan" className={`text-xs font-medium ${theme.label}`}>Seçilen Paket</Label>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className={`h-10 sm:h-11 w-full ${theme.inputBg} ${theme.inputBorder} text-white rounded-lg sm:rounded-xl transition-all text-sm`}>
                <SelectValue placeholder="Paket Seçiniz" />
              </SelectTrigger>
              <SelectContent className={`bg-slate-900 ${theme.border} text-white`}>
                <SelectItem value="baslangic">Başlangıç - $999</SelectItem>
                <SelectItem value="buyume" className="w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1 sm:gap-2">
                    <span>Büyüme (Growth) - $1799</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit ${theme.badge}`}>
                      <Star className="w-3 h-3 fill-current" />
                      En Çok Tercih Edilen
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="kurumsal">Kurumsal Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. AD SOYAD */}
          <div className="grid gap-1 md:col-span-1">
            <Label htmlFor="name" className={`text-xs font-medium ${theme.label}`}>Ad Soyad</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Adınız Soyadınız" 
              className={`h-10 sm:h-11 w-full ${theme.inputBg} ${theme.inputBorder} text-white placeholder:text-white/20 rounded-lg sm:rounded-xl ${theme.ring} transition-all text-sm`}
              required
              onInvalid={handleInvalid}
            />
          </div>

          {/* 3. TELEFON */}
          <div className="grid gap-1 md:col-span-1">
            <Label htmlFor="phone" className={`text-xs font-medium ${theme.label}`}>Telefon Numarası</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-xs sm:text-sm font-medium border-r border-white/10 pr-2 h-4 flex items-center">
                +90
              </div>
              <Input 
                id="phone" 
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="5XX XXX XX XX" 
                className={`h-10 sm:h-11 w-full pl-12 sm:pl-14 ${theme.inputBg} ${theme.inputBorder} text-white placeholder:text-white/20 rounded-lg sm:rounded-xl ${theme.ring} transition-all text-sm`}
                required 
                onInvalid={handleInvalid}
              />
            </div>
          </div>

          {/* 4. E-POSTA */}
          <div className="grid gap-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="email" className={`text-xs font-medium ${theme.label}`}>E-Posta</Label>
              <span className="text-[10px] text-white/40">(Opsiyonel)</span>
            </div>
            <Input 
              id="email" 
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ornek@sirket.com" 
              className={`h-10 sm:h-11 w-full ${theme.inputBg} ${theme.inputBorder} text-white placeholder:text-white/20 rounded-lg sm:rounded-xl ${theme.ring} transition-all text-sm`}
            />
          </div>

          {/* 5. AÇIKLAMA */}
          <div className="grid gap-1 md:col-span-2">
            <Label htmlFor="message" className={`text-xs font-medium ${theme.label}`}>Projenizden Bahsedin</Label>
            <Textarea 
              id="message" 
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Projeniz hakkında kısa bir bilgi..." 
              className={`min-h-[80px] sm:min-h-[100px] w-full ${theme.inputBg} ${theme.inputBorder} text-white placeholder:text-white/20 rounded-lg sm:rounded-xl ${theme.ring} transition-all resize-none p-3 text-sm`}
              required
              onInvalid={handleInvalid}
            />
          </div>

          {/* BUTON */}
          <div className="pt-1 md:col-span-2">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full h-11 sm:h-12 rounded-full text-white font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${theme.button}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                "Gönder"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}