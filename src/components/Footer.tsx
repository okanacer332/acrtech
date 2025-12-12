"use client";

import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from 'lucide-react';
import { useLanguage } from '@/src/lib/i18n/LanguageContext';

interface FooterProps {
  mode: 'design' | 'code';
}

export function Footer({ mode }: FooterProps) {
  const { t } = useLanguage();

  const servicesLinks = mode === 'design' ? t.footer.designServices : t.footer.codeServices;

  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br transition-colors duration-700 ${
                mode === 'design'
                  ? 'from-purple-500 to-fuchsia-500'
                  : 'from-blue-500 to-cyan-500'
              }`}></div>
              <span className="text-white text-lg sm:text-xl font-bold">
                {mode === 'design' ? 'ACR Design' : 'ACR Tech'}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
              {mode === 'design' ? t.footer.brandDescDesign : t.footer.brandDescCode}
            </p>
            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                mode === 'design'
                  ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
              }`}>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                mode === 'design'
                  ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
              }`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                mode === 'design'
                  ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
              }`}>
                {mode === 'design' ? <Instagram className="w-5 h-5" /> : <Github className="w-5 h-5" />}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className={`text-sm sm:text-base mb-4 sm:mb-6 font-medium transition-colors duration-500 ${
              mode === 'design' ? 'text-purple-300' : 'text-blue-300'
            }`}>
              {t.footer.colServices}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {servicesLinks.map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`text-sm sm:text-base mb-4 sm:mb-6 font-medium transition-colors duration-500 ${
              mode === 'design' ? 'text-purple-300' : 'text-blue-300'
            }`}>
              {t.footer.colCompany}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {t.footer.companyLinks.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-sm sm:text-base mb-4 sm:mb-6 font-medium transition-colors duration-500 ${
              mode === 'design' ? 'text-purple-300' : 'text-blue-300'
            }`}>
              {t.footer.colContact}
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-400">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>hello@acrtech.com</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-400">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>+90 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-400">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>Teknopark, İstanbul<br />Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © 2024 ACRTECH. {t.footer.copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              {t.footer.terms}
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              {t.footer.cookie}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}