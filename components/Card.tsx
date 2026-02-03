import React from 'react';
import { User, Building2, Quote, Clock, Phone, Mail } from 'lucide-react';
import { NetworkCard } from '../types';

interface CardProps {
  data: NetworkCard;
}

export const Card: React.FC<CardProps> = ({ data }) => {
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Právě teď';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hod`;
    return 'Dříve';
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-l-4 border-wine-900 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
           <div className="p-2 bg-wine-50 rounded-full text-wine-900 shrink-0">
             <User size={18} strokeWidth={2.5} />
           </div>
           <div className="overflow-hidden">
             <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">{data.name}</h3>
             <div className="flex items-center gap-1.5 text-wine-700 text-sm font-medium mt-0.5">
               <Building2 size={14} className="shrink-0" />
               <span className="truncate">{data.company}</span>
             </div>
           </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-full shrink-0">
          <Clock size={12} />
          {timeAgo(data.timestamp)}
        </div>
      </div>

      {/* Contact Info Row */}
      <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600 pl-1">
        <a href={`tel:${data.phone}`} className="flex items-center gap-1.5 hover:text-wine-800 transition-colors bg-gray-50 px-2 py-1 rounded-lg">
          <Phone size={14} className="text-wine-600" />
          <span>{data.phone}</span>
        </a>
        <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-wine-800 transition-colors bg-gray-50 px-2 py-1 rounded-lg">
          <Mail size={14} className="text-wine-600" />
          <span>{data.email}</span>
        </a>
      </div>
      
      <div className="mt-2 relative pt-2 border-t border-gray-100">
        <div className="absolute -left-1 top-1 text-wine-100">
          <Quote size={24} className="fill-current" />
        </div>
        <p className="relative z-10 text-gray-700 leading-relaxed text-sm pt-1 pl-2">
          {data.message}
        </p>
      </div>
    </div>
  );
};