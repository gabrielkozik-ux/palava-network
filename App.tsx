import React, { useState, useEffect, useMemo } from 'react';
import { Grape, Search, PlusCircle, X, User, Briefcase, Phone, Mail } from 'lucide-react';
import { NetworkCard } from './types';
import { Button } from './components/Button';
import { Input, TextArea } from './components/Input';
import { Card } from './components/Card';

const STORAGE_KEY = 'palava_networking_cards_v1';
const PROFILE_KEY = 'palava_user_profile_v1';

export default function App() {
  const [cards, setCards] = useState<NetworkCard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormExpanded, setIsFormExpanded] = useState(true);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    // Load Cards
    const savedCards = localStorage.getItem(STORAGE_KEY);
    if (savedCards) {
      try {
        setCards(JSON.parse(savedCards));
      } catch (e) {
        console.error("Failed to parse cards", e);
      }
    }

    // Load User Profile (Persistence)
    const savedProfile = localStorage.getItem(PROFILE_KEY);
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setName(profile.name || '');
        setCompany(profile.company || '');
        setPhone(profile.phone || '');
        setEmail(profile.email || '');
      } catch (e) {
        console.error("Failed to parse profile", e);
      }
    }
  }, []);

  // Save to local storage whenever cards change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !message.trim() || !phone.trim() || !email.trim()) return;

    const newCard: NetworkCard = {
      id: crypto.randomUUID(),
      name: name.trim(),
      company: company.trim(),
      phone: phone.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    setCards(prev => [newCard, ...prev]);
    
    // Save User Profile to localStorage
    const userProfile = {
      name: name.trim(),
      company: company.trim(),
      phone: phone.trim(),
      email: email.trim()
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));

    // Reset only the message part, keep identity info
    setMessage('');
    
    // On mobile, if we want to see the list immediately, we could collapse, 
    // but since we keep the data filled, users might want to add another request.
    // Let's keep it open or provide feedback. 
    // For now, adhering to "simple form" logic, we just scroll to list or stay put.
    if (window.innerWidth < 768) {
      setIsFormExpanded(false);
    }
  };

  const filteredCards = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return cards.filter(card => 
      card.name.toLowerCase().includes(lowerQuery) ||
      card.company.toLowerCase().includes(lowerQuery) ||
      card.message.toLowerCase().includes(lowerQuery)
    );
  }, [cards, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-wine-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <Grape className="text-white h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Pálava Connect</h1>
            </div>
            <button 
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="md:hidden text-white/80 hover:text-white p-2"
            >
              {isFormExpanded ? <X size={24} /> : <PlusCircle size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        
        {/* Input Form */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isFormExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[1000px] md:opacity-100'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-bold text-wine-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-wine-900 rounded-full"></span>
              Nová vizitka
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                label="Jméno a Příjmení" 
                placeholder="Jan Novák" 
                value={name} 
                onChange={e => setName(e.target.value)}
                icon={<User size={18} />}
                required
              />
              <Input 
                label="Firma / Obor" 
                placeholder="Vinařství Novák" 
                value={company} 
                onChange={e => setCompany(e.target.value)}
                icon={<Briefcase size={18} />}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Telefon" 
                  type="tel"
                  placeholder="+420 123 456 789" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)}
                  icon={<Phone size={18} />}
                  required
                />
                <Input 
                  label="Email" 
                  type="email"
                  placeholder="jan@vinarstvi.cz" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  icon={<Mail size={18} />}
                  required
                />
              </div>
              <TextArea 
                label="Co dnes hledám / nabízím" 
                placeholder="Hledám dodavatele etiket..." 
                value={message} 
                onChange={e => setMessage(e.target.value)}
                required
              />
              <Button type="submit">
                Přidat vizitku
              </Button>
            </form>
          </div>
        </div>

        {/* Search & List Header */}
        <div className="space-y-4">
           <div className="relative sticky top-[72px] z-40"> 
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-5 w-5 text-wine-900/40" />
             </div>
             <input
               type="text"
               className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-wine-500 shadow-sm transition-shadow"
               placeholder="Hledat..."
               value={searchQuery}
               onChange={e => setSearchQuery(e.target.value)}
             />
           </div>

           <div className="flex items-center justify-between px-1">
             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
               Vizitky ({filteredCards.length})
             </h3>
             {filteredCards.length > 0 && searchQuery && (
               <button 
                 onClick={() => setSearchQuery('')}
                 className="text-xs font-medium text-wine-600 hover:text-wine-800"
               >
                 Zrušit filtr
               </button>
             )}
           </div>
        </div>

        {/* Card List */}
        <div className="space-y-4 pb-8">
          {filteredCards.length > 0 ? (
            filteredCards.map(card => (
              <Card key={card.id} data={card} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="text-gray-300 w-8 h-8" />
              </div>
              <p className="text-gray-500 font-medium">
                {searchQuery ? 'Nic jsme nenašli.' : 'Zatím žádné vizitky.'}
              </p>
              {searchQuery ? (
                 <p className="text-sm text-gray-400 mt-1">Zkuste jiné klíčové slovo.</p>
              ) : (
                <p className="text-sm text-gray-400 mt-1">Buďte první a přidejte se!</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}