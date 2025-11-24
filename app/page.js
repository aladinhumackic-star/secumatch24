'use client'

import React, { useState, useEffect } from 'react';
import { Shield, MapPin, Calendar, Users, ChevronDown, Star, CheckCircle, ArrowRight, Phone, Clock, Zap, Send, Building, User, AlertCircle, Quote } from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    service: '',
    location: '',
    date: '',
    duration: '',
    quantity: '',
    description: '',
    customerType: 'private',
    name: '',
    email: '',
    phone: '',
    privacy: false
  });
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const services = [
    { id: 'event', label: 'Event-Security', icon: '🎪' },
    { id: 'door', label: 'Doormen & Türsteher', icon: '🚪' },
    { id: 'personal', label: 'Personenschutz', icon: '🛡️' },
    { id: 'object', label: 'Objektschutz', icon: '🏢' },
    { id: 'shuttle', label: 'Security-Shuttle', icon: '🚗' },
    { id: 'other', label: 'Sonstiges', icon: '📋' },
  ];

  const quantities = [
    { id: '1-2', label: '1-2 Personen' },
    { id: '3-5', label: '3-5 Personen' },
    { id: '6-10', label: '6-10 Personen' },
    { id: '10+', label: 'Mehr als 10' },
    { id: 'unsure', label: 'Weiß ich noch nicht' },
  ];

  const testimonials = [
    {
      name: 'Marcus Weber',
      role: 'Eventmanager',
      company: 'Weber Events GmbH',
      location: 'Berlin',
      text: 'Unser Headliner sagte 3 Tage vor dem Festival ab, wir mussten komplett umplanen. Plötzlich brauchten wir 15 zusätzliche Security-Kräfte für den neuen Bühnenbereich. SecuMatch hat uns innerhalb von 6 Stunden 4 Angebote geschickt. Am nächsten Morgen war alles geregelt.',
      rating: 5,
      image: '👨‍💼',
      highlight: '6 Stunden bis zum Angebot',
      category: 'event'
    },
    {
      name: 'Sandra Klein',
      role: 'Inhaberin',
      company: 'Club Nachtwerk',
      location: 'München',
      text: 'Freitagnacht, 22 Uhr: Einer meiner Türsteher fällt krankheitsbedingt aus. Normalerweise ein Albtraum. Über SecuMatch hatte ich um 22:30 einen Ersatz bestätigt, der um 23:15 vor der Tür stand. Seitdem läuft unser komplettes Doorman-Management über die Plattform.',
      rating: 5,
      image: '👩‍💼',
      highlight: 'Ersatz in 45 Minuten',
      category: 'door'
    },
    {
      name: 'Thomas Richter',
      role: 'Facility Manager',
      company: 'Richter Immobilien',
      location: 'Frankfurt',
      text: 'Drei Leerstände in Problemvierteln, ständig Vandalismus und Einbruchversuche. Die Versicherung hat gedroht, uns rauszuwerfen. Über SecuMatch haben wir jetzt Objektschutz für alle drei Standorte – und zahlen 30% weniger als bei unserem alten Anbieter.',
      rating: 5,
      image: '👨‍💼',
      highlight: '30% Kostenersparnis',
      category: 'object'
    },
    {
      name: 'Dr. Julia Hoffmann',
      role: 'Geschäftsführerin',
      company: 'MedTech Solutions',
      location: 'Hamburg',
      text: 'Für unsere Investorenkonferenz brauchten wir diskrete Security – keine Uniformen, aber trotzdem professionell. SecuMatch hat genau verstanden, was wir wollten. Die vermittelten Kräfte waren so unauffällig, dass unsere Gäste sie für Mitarbeiter hielten.',
      rating: 5,
      image: '👩‍⚕️',
      highlight: 'Perfektes Briefing',
      category: 'event'
    },
    {
      name: 'Mehmet Yilmaz',
      role: 'Restaurantbesitzer',
      company: 'Yilmaz Gastro Group',
      location: 'Köln',
      text: 'Nach einem Überfall auf mein Restaurant wollte ich sofort Sicherheitspersonal. Aber als kleiner Gastronom kriegst du bei den großen Firmen keinen Termin unter 2 Wochen. Bei SecuMatch hatte ich am selben Abend drei Angebote von lokalen Anbietern.',
      rating: 5,
      image: '👨‍🍳',
      highlight: 'Hilfe am selben Tag',
      category: 'object'
    },
    {
      name: 'Katharina von Steinberg',
      role: 'Wedding Planner',
      company: 'Traumhochzeiten Berlin',
      location: 'Berlin',
      text: 'High-End-Hochzeiten mit prominenten Gästen – da muss die Security stimmen. Seit ich SecuMatch nutze, habe ich einen Pool von 5 verifizierten Anbietern, die ich je nach Anforderung buche. Meine Kunden sind begeistert.',
      rating: 5,
      image: '👩‍💼',
      highlight: 'Premium-Qualität garantiert',
      category: 'personal'
    },
    {
      name: 'Stefan Braun',
      role: 'Bauleiter',
      company: 'Braun & Partner Bau',
      location: 'Stuttgart',
      text: 'Auf Baustellen verschwindet ständig Material. Wir haben jetzt für jedes größere Projekt Nachtwache über SecuMatch. Das Beste: Ich kann die Schichten flexibel buchen – nur wenn wir wirklich teure Geräte vor Ort haben.',
      rating: 5,
      image: '👷',
      highlight: 'Flexible Buchung',
      category: 'object'
    },
    {
      name: 'Lisa & Markus Engel',
      role: 'Privatpersonen',
      company: '',
      location: 'Düsseldorf',
      text: 'Unsere Tochter hat geheiratet – 200 Gäste, Feier bis 4 Uhr morgens. Wir wollten einfach sicher sein, dass alles ruhig bleibt. Zwei Herren von SecuMatch waren die ganze Nacht da, super diskret. Wir haben sie fast vergessen!',
      rating: 5,
      image: '👫',
      highlight: 'Diskret & zuverlässig',
      category: 'event'
    },
    {
      name: 'Alexander Petrov',
      role: 'CEO',
      company: 'Petrov Logistics',
      location: 'Berlin',
      text: 'Als russischstämmiger Unternehmer bekomme ich leider regelmäßig Drohungen. SecuMatch hat mir innerhalb von 24 Stunden einen persönlichen Sicherheitsberater vermittelt, der jetzt meinen Schutz koordiniert. Professionell, diskret, und ich fühle mich wieder sicher.',
      rating: 5,
      image: '👨‍💼',
      highlight: 'Personenschutz in 24h',
      category: 'personal'
    },
    {
      name: 'Nina Schulz',
      role: 'Marketing Director',
      company: 'TechStart GmbH',
      location: 'München',
      text: 'Product Launch mit 500 Gästen, VIPs aus der Tech-Szene, Live-Stream – und eine Woche vorher kündigt unsere Security-Firma wegen Personalmangel. Panik! SecuMatch hat uns gerettet. 12 Leute, perfekt gebrieft, pünktlich.',
      rating: 5,
      image: '👩‍💼',
      highlight: 'Rettung in letzter Minute',
      category: 'event'
    },
    {
      name: 'Hans-Peter Müller',
      role: 'Geschäftsführer',
      company: 'Müller Autohaus',
      location: 'Hannover',
      text: 'Drei Einbrüche in 6 Monaten – Schaden über 80.000 Euro. Die Polizei konnte nicht viel machen. Jetzt haben wir Nachtstreife über SecuMatch, zwei Mal pro Nacht. Seitdem: Null Vorfälle. Die Security zahlt sich buchstäblich selbst.',
      rating: 5,
      image: '👨‍💼',
      highlight: 'Null Vorfälle seitdem',
      category: 'object'
    },
    {
      name: 'Amelie Fontaine',
      role: 'Galeristin',
      company: 'Galerie Fontaine',
      location: 'Berlin',
      text: 'Vernissagen mit Werken im sechsstelligen Bereich – da will man keine Risiken. Die Security von SecuMatch ist kultiviert, spricht mehrere Sprachen, und versteht, wie man mit Kunstsammlern umgeht. Das sind Profis auf anderem Niveau.',
      rating: 5,
      image: '👩‍🎨',
      highlight: 'Kultivierte Profis',
      category: 'event'
    }
  ];

  const quickReviews = [
    { name: 'M. Schneider', text: 'Schnell, unkompliziert, faire Preise.', rating: 5, location: 'Leipzig' },
    { name: 'A. Becker', text: 'Endlich eine Plattform, die funktioniert!', rating: 5, location: 'Dresden' },
    { name: 'S. Wagner', text: 'Haben uns aus der Patsche geholfen.', rating: 5, location: 'Nürnberg' },
    { name: 'K. Fischer', text: 'Professioneller geht es nicht.', rating: 5, location: 'Bremen' },
    { name: 'J. Weber', text: 'Nutzen SecuMatch jetzt regelmäßig.', rating: 5, location: 'Essen' },
    { name: 'L. Koch', text: 'Preis-Leistung stimmt absolut.', rating: 5, location: 'Dortmund' },
  ];

  const stats = [
    { value: '2.847', label: 'Erfolgreiche Vermittlungen', icon: <CheckCircle className="w-5 h-5" /> },
    { value: '4.9', label: 'Kundenbewertung', icon: <Star className="w-5 h-5 fill-current" />, suffix: '/5' },
    { value: '127', label: 'Minuten Ø Antwortzeit', icon: <Clock className="w-5 h-5" /> },
    { value: '100%', label: 'Verifizierte Anbieter', icon: <Shield className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const featuredTestimonials = testimonials.slice(0, 3);

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.service) newErrors.service = 'Bitte wählen Sie einen Service';
    if (!formData.location) newErrors.location = 'Bitte geben Sie einen Ort an';
    if (!formData.date) newErrors.date = 'Bitte wählen Sie ein Datum';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Bitte geben Sie Ihren Namen an';
    if (!formData.email) newErrors.email = 'Bitte geben Sie Ihre E-Mail an';
    if (!formData.phone) newErrors.phone = 'Bitte geben Sie Ihre Telefonnummer an';
    if (!formData.privacy) newErrors.privacy = 'Bitte stimmen Sie der Datenschutzerklärung zu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setFormStep(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    
    // Hier später: Echte Form-Submission zu Tally, Notion, oder API
    // Für jetzt: Simulierte Verzögerung
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Anfrage erhalten!</h1>
          <p className="text-slate-400 mb-8">
            Vielen Dank, {formData.name.split(' ')[0]}! Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden mit passenden Angeboten.
          </p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-left mb-8">
            <h3 className="font-semibold mb-4 text-amber-400">Ihre Anfrage:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span>{services.find(s => s.id === formData.service)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ort:</span>
                <span>{formData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Datum:</span>
                <span>{formData.date}</span>
              </div>
            </div>
          </div>
          <a href="/" className="inline-flex items-center gap-2 text-amber-400 hover:underline">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Zurück zur Startseite
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">SecuMatch<span className="text-amber-500">24</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-sm text-slate-400">
              <div className="flex -space-x-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="ml-1">4.9 • 500+ Bewertungen</span>
            </div>
            <a href="tel:+493012345678" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-sm">030 12345678</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
            <Zap className="w-4 h-4" />
            <span>Bereits 2.847 erfolgreiche Vermittlungen</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Professionelle Security.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              In unter 24 Stunden.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 mb-6 max-w-2xl mx-auto">
            Geprüfte Anbieter für Events, Objektschutz und Personenschutz. 
            Kostenlose Anfrage in 2 Minuten – durchschnittlich 3 Angebote in 24h.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>100% kostenlos</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Nur verifizierte Anbieter</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Ø 127 Min. Antwortzeit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Card */}
      <section className="px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            
            <div className="h-1 bg-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500"
                style={{ width: formStep === 1 ? '50%' : '100%' }}
              />
            </div>

            <div className="flex border-b border-slate-800">
              <button
                onClick={() => updateField('customerType', 'private')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition ${
                  formData.customerType === 'private' 
                    ? 'bg-slate-800/50 text-white border-b-2 border-amber-500' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-5 h-5" />
                Privat
              </button>
              <button
                onClick={() => updateField('customerType', 'business')}
                className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition ${
                  formData.customerType === 'business' 
                    ? 'bg-slate-800/50 text-white border-b-2 border-amber-500' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building className="w-5 h-5" />
                Geschäftlich
              </button>
            </div>

            <div className="p-6 sm:p-8">
              
              {formStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-2">Was brauchen Sie?</h2>
                    <p className="text-slate-400 text-sm">Schritt 1 von 2 • Dauert nur 60 Sekunden</p>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-3">Art der Security *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {services.map(service => (
                        <button
                          key={service.id}
                          onClick={() => updateField('service', service.id)}
                          className={`p-4 rounded-xl border text-left transition ${
                            formData.service === service.id
                              ? 'border-amber-500 bg-amber-500/10 text-white'
                              : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div className="text-2xl mb-2">{service.icon}</div>
                          <div className="text-sm font-medium">{service.label}</div>
                        </button>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.service}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Wo? *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input 
                          type="text"
                          placeholder="Stadt oder PLZ"
                          value={formData.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition ${
                            errors.location ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'
                          }`}
                        />
                      </div>
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-400">{errors.location}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Wann? *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input 
                          type="date"
                          value={formData.date}
                          onChange={(e) => updateField('date', e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none transition ${
                            errors.date ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'
                          }`}
                        />
                      </div>
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-400">{errors.date}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Wie viele Personen?</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <select
                        value={formData.quantity}
                        onChange={(e) => updateField('quantity', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:border-amber-500 transition"
                      >
                        <option value="">Auswählen...</option>
                        {quantities.map(q => (
                          <option key={q.id} value={q.id}>{q.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Weitere Details (optional)</label>
                    <textarea
                      placeholder="Z.B. Art des Events, besondere Anforderungen..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition resize-none"
                    />
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                  >
                    Weiter zu Ihren Kontaktdaten
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-2">Fast geschafft!</h2>
                    <p className="text-slate-400 text-sm">Schritt 2 von 2 • Noch 30 Sekunden</p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Ihre Anfrage:</span>
                      <button 
                        onClick={() => setFormStep(1)}
                        className="text-amber-400 text-sm hover:underline"
                      >
                        Bearbeiten
                      </button>
                    </div>
                    <div className="text-sm">
                      {services.find(s => s.id === formData.service)?.icon} {services.find(s => s.id === formData.service)?.label} • {formData.location} • {formData.date}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Name *</label>
                    <input 
                      type="text"
                      placeholder="Vor- und Nachname"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition ${
                        errors.name ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">E-Mail *</label>
                      <input 
                        type="email"
                        placeholder="ihre@email.de"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition ${
                          errors.email ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Telefon *</label>
                      <input 
                        type="tel"
                        placeholder="+49 123 456789"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition ${
                          errors.phone ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacy}
                        onChange={(e) => updateField('privacy', e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-sm text-slate-400">
                        Ich stimme der <a href="/datenschutz" className="text-amber-400 hover:underline">Datenschutzerklärung</a> zu. *
                      </span>
                    </label>
                    {errors.privacy && <p className="mt-1 text-sm text-red-400">{errors.privacy}</p>}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setFormStep(1)}
                      className="px-6 py-4 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition"
                    >
                      Zurück
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          Kostenlos Angebote erhalten
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="px-4 py-12 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Das sagen unsere Kunden
            </h2>
            <p className="text-slate-400">Über 500 verifizierte Bewertungen</p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="absolute -top-3 -left-3 w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-amber-400" />
              </div>
              
              {featuredTestimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeTestimonialIndex ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="text-lg sm:text-xl text-slate-200 mb-6 leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center text-2xl">
                        {testimonial.image}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-slate-400">
                          {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                        </div>
                        <div className="text-sm text-slate-500">{testimonial.location}</div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                      <span className="text-emerald-400 text-sm font-medium">{testimonial.highlight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonialIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === activeTestimonialIndex ? 'bg-amber-500 w-6' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.slice(3, 9).map((testimonial, index) => (
              <div 
                key={index}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4 line-clamp-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}, {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reviews Strip */}
      <section className="px-4 py-8 bg-slate-900/30 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {quickReviews.map((review, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full"
              >
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-slate-300">&ldquo;{review.text}&rdquo;</span>
                <span className="text-xs text-slate-500">– {review.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Testimonials */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8">Weitere Erfahrungsberichte</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.slice(9).map((testimonial, index) => (
              <div 
                key={index}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4 line-clamp-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}, {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Bereit für professionelle Security?
          </h2>
          <p className="text-slate-400 mb-8">
            Kostenlose Anfrage in 2 Minuten. Durchschnittlich 3 Angebote in 24 Stunden.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition shadow-lg shadow-amber-500/25 inline-flex items-center gap-2"
          >
            Jetzt kostenlos anfragen
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span>© 2025 SecuMatch24</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Gesamtbewertung:</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-amber-400 font-medium">4.9/5</span>
              <span className="text-slate-600">|</span>
              <span>527 Bewertungen</span>
            </div>
            <div className="flex gap-6">
              <a href="/impressum" className="hover:text-white transition">Impressum</a>
              <a href="/datenschutz" className="hover:text-white transition">Datenschutz</a>
              <a href="/agb" className="hover:text-white transition">AGB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
