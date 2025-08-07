"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Music, MicOffIcon as MusicOff, Gift, MapPin, Calendar, Clock, User, Copy, Check, Menu, X, Camera, MessageCircle, Phone, Mail, Instagram, Facebook, Moon, Sun, ExternalLink, Navigation, Send, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

export default function WeddingInvitation() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guestCount: '',
    message: ''
  })
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInvitation(true)
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          console.log("Auto play failed")
        })
      }
    }, 1000)

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }

    // Scroll spy for navbar
    const handleScroll = () => {
      const sections = ['home', 'couple', 'story', 'events', 'gallery', 'maps', 'gift', 'rsvp']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const copyToClipboard = (text: string, accountName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAccount(accountName)
    toast({
      title: "Berhasil disalin!",
      description: `Nomor rekening ${accountName} telah disalin ke clipboard.`,
    })
    setTimeout(() => setCopiedAccount(null), 2000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.attendance) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon isi nama dan konfirmasi kehadiran.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Konfirmasi berhasil dikirim! 🎉",
          description: "Terima kasih atas konfirmasi kehadiran Anda.",
        })
        
        // Reset form
        setFormData({
          name: '',
          attendance: '',
          guestCount: '',
          message: ''
        })
      } else {
        throw new Error(result.error || 'Failed to submit')
      }
    } catch (error) {
      console.error('RSVP submission error:', error)
      toast({
        title: "Gagal mengirim konfirmasi",
        description: "Silakan coba lagi dalam beberapa saat.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'couple', label: 'Mempelai' },
    { id: 'story', label: 'Cerita' },
    { id: 'events', label: 'Acara' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'maps', label: 'Lokasi' },
    { id: 'gift', label: 'Kado' },
    { id: 'rsvp', label: 'RSVP' }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative transition-all duration-500">
        {/* Animated Background Particles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20 dark:opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-amber-400' : 'bg-amber-300'} animate-pulse`}></div>
            </div>
          ))}
        </div>

        {/* Batik Pattern Background */}
        <div className="fixed inset-0 opacity-5 dark:opacity-3 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D97706' fillOpacity='0.1'%3E%3Cpath d='M50 50m-20 0a20 20 0 1 1 40 0a20 20 0 1 1 -40 0'/%3E%3Cpath d='M50 10m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0'/%3E%3Cpath d='M50 90m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0'/%3E%3Cpath d='M10 50m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0'/%3E%3Cpath d='M90 50m-5 0a5 5 0 1 1 10 0a5 5 0 1 1 -10 0'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} loop>
          <source src="/wedding-song.mp3" type="audio/mpeg" />
        </audio>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-amber-200 dark:border-gray-700 transition-all duration-300">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2 animate-slide-right">
                <div className="relative">
                  <Heart className="h-8 w-8 text-amber-600 dark:text-amber-400 animate-pulse" fill="currentColor" />
                  <div className="absolute inset-0 h-8 w-8 text-amber-600 dark:text-amber-400 animate-ping opacity-20">
                    <Heart className="h-8 w-8" fill="currentColor" />
                  </div>
                </div>
                <span className="text-xl font-serif font-bold text-amber-800 dark:text-amber-200">R & A</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-all duration-300 hover:text-amber-600 dark:hover:text-amber-400 transform hover:scale-105 animate-slide-down ${
                      activeSection === item.id 
                        ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-600 dark:border-amber-400' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Dark Mode Toggle */}
                <Button
                  onClick={toggleDarkMode}
                  className="rounded-full w-10 h-10 bg-amber-100 dark:bg-gray-700 hover:bg-amber-200 dark:hover:bg-gray-600 text-amber-700 dark:text-amber-300 transition-all duration-300 transform hover:scale-110"
                  size="icon"
                  variant="ghost"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {/* Music Control */}
                <Button
                  onClick={toggleMusic}
                  className="rounded-full w-10 h-10 bg-amber-100 dark:bg-gray-700 hover:bg-amber-200 dark:hover:bg-gray-600 text-amber-700 dark:text-amber-300 transition-all duration-300 transform hover:scale-110"
                  size="icon"
                  variant="ghost"
                >
                  {isPlaying ? (
                    <Music className="h-4 w-4 animate-bounce" />
                  ) : (
                    <MusicOff className="h-4 w-4" />
                  )}
                </Button>

                {/* Mobile Menu Button */}
                <Button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden rounded-full w-10 h-10 transition-all duration-300 transform hover:scale-110"
                  size="icon"
                  variant="ghost"
                >
                  {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-amber-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md animate-slide-down">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 transition-all duration-300 animate-slide-left"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${5 + Math.random() * 3}s`
                }}
              >
                <Heart className="h-6 w-6 text-pink-300 dark:text-pink-400 opacity-30 animate-pulse" fill="currentColor" />
              </div>
            ))}
          </div>

          <div className={`text-center max-w-4xl mx-auto px-4 transition-all duration-2000 ${showInvitation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Javanese Ornament */}
            <div className="mb-8 animate-fade-in">
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Heart className="h-16 w-16 text-white animate-heartbeat" fill="currentColor" />
                </div>
                <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>

            {/* Javanese Greeting */}
            <div className="mb-8 animate-slide-up animation-delay-300">
              <p className="text-lg text-amber-700 dark:text-amber-300 font-medium mb-2 animate-fade-in">
                ꦱꦸꦒꦼꦁ ꦫꦮꦸꦃ
              </p>
              <p className="text-amber-600 dark:text-amber-400 animate-slide-up animation-delay-500">Sugeng Rawuh</p>
            </div>

            {/* Main Title */}
            <div className="mb-8 animate-slide-up animation-delay-500">
              <h1 className="text-5xl md:text-7xl font-serif text-amber-800 dark:text-amber-200 mb-4 leading-tight animate-scale-up">
                Ririn <span className="text-amber-600 dark:text-amber-400 animate-pulse">&</span> Andika
              </h1>
              <p className="text-2xl text-amber-700 dark:text-amber-300 font-light mb-4 animate-slide-up animation-delay-700">Mantu</p>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 mx-auto rounded-full animate-expand"></div>
            </div>

            {/* Date */}
            <div className="mb-12 animate-slide-up animation-delay-700">
              <div className="inline-block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-amber-200 dark:border-gray-600 transform hover:scale-105 transition-all duration-300">
                <p className="text-3xl font-serif text-amber-800 dark:text-amber-200 mb-2 animate-pulse">17 Oktober 2025</p>
                <p className="text-amber-600 dark:text-amber-400">Sidoarjo, Jawa Timur</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="animate-slide-up animation-delay-1000">
              <Button
                onClick={() => scrollToSection('couple')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 hover:from-amber-600 hover:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce-slow"
              >
                Lihat Undangan
                <Heart className="ml-2 h-5 w-5 animate-pulse" fill="currentColor" />
              </Button>
            </div>
          </div>
        </section>

        {/* Couple Section */}
        <section id="couple" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-serif text-amber-800 dark:text-amber-200 mb-4">Calon Mempelai</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 mx-auto rounded-full animate-expand"></div>
            </div>

            {/* Islamic Greeting */}
            <div className="text-center mb-12 max-w-3xl mx-auto animate-fade-in animation-delay-300">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-4">
                Assalamu'alaikum Warahmatullahi Wabarakatuh
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i
                untuk hadir pada pernikahan kami yang akan diselenggarakan pada:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Bride */}
              <div className="text-center animate-slide-left animation-delay-500">
                <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 group">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="relative w-40 h-40 mx-auto mb-4 group-hover:scale-110 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 dark:from-pink-700 dark:to-rose-800 rounded-full animate-pulse"></div>
                        <Image
                          src="/images/bride.png"
                          alt="Ririn Sulistyani"
                          width={160}
                          height={160}
                          className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/20 to-rose-500/20 animate-ping"></div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-serif text-gray-800 dark:text-gray-200 mb-4 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                      Ririn Sulistyani
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <p className="font-medium">Putri kedua dari:</p>
                      <p>Bapak Tony Sugiarto</p>
                      <p>&</p>
                      <p>Ibu Sarmten (Bu Ten)</p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => window.open('https://instagram.com/ririn_sulistyani', '_blank')}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full px-6 py-2 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        <Instagram className="h-4 w-4 mr-2" />
                        @ririn_sulistyani
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Groom */}
              <div className="text-center animate-slide-right animation-delay-500">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1 group">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="relative w-40 h-40 mx-auto mb-4 group-hover:scale-110 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-700 dark:to-indigo-800 rounded-full animate-pulse"></div>
                        <Image
                          src="/images/groom.png"
                          alt="Andika Ferdi Alvianto"
                          width={160}
                          height={160}
                          className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 animate-ping"></div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-serif text-gray-800 dark:text-gray-200 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Andika Ferdi Alvianto
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <p className="font-medium">Putra pertama dari:</p>
                      <p>Bapak Agung Drimulyo Sejati</p>
                      <p>&</p>
                      <p>Ibu Susiningsih</p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => window.open('https://instagram.com/andika_ferdi', '_blank')}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full px-6 py-2 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        <Instagram className="h-4 w-4 mr-2" />
                        @andika_ferdi
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Love Story Section */}
        <section id="story" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-serif text-amber-800 dark:text-amber-200 mb-4">Cerita Cinta Kami</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 mx-auto rounded-full animate-expand"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {/* Timeline Item 1 */}
                <div className="flex items-center animate-slide-left animation-delay-300 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 animate-pulse">
                    1
                  </div>
                  <div className="ml-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex-1 transform group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-2">Pertemuan Pertama</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Kami pertama kali bertemu di acara keluarga pada tahun 2020. 
                      Saat itu, kami hanya saling menyapa sebagai teman.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="flex items-center justify-end animate-slide-right animation-delay-500 group">
                  <div className="mr-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex-1 text-right transform group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-2">Mulai Dekat</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Seiring berjalannya waktu, kami mulai sering berkomunikasi dan 
                      menemukan banyak kesamaan dalam pandangan hidup.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 animate-pulse animation-delay-200">
                    2
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="flex items-center animate-slide-left animation-delay-700 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 animate-pulse animation-delay-400">
                    3
                  </div>
                  <div className="ml-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex-1 transform group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-2">Lamaran</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Pada tahun 2024, kami memutuskan untuk melanjutkan hubungan ke jenjang yang lebih serius 
                      dengan melakukan lamaran secara resmi.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 4 */}
                <div className="flex items-center justify-end animate-slide-right animation-delay-900 group">
                  <div className="mr-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex-1 text-right transform group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-2">Pernikahan</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Dan sekarang, kami siap untuk memulai babak baru dalam hidup kami 
                      sebagai pasangan suami istri. Doakan kami ya!
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300 animate-heartbeat">
                    <Heart className="h-8 w-8" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-serif text-amber-800 dark:text-amber-200 mb-4">Rangkaian Acara</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 mx-auto rounded-full animate-expand"></div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Akad Nikah */}
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 animate-slide-left animation-delay-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-4">
                      <Calendar className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto group-hover:scale-110 transition-all duration-300" />
                      <div className="absolute inset-0 h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto animate-ping opacity-20">
                        <Calendar className="h-12 w-12" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Akad Nikah
                    </h3>
                    <div className="space-y-3 text-gray-600 dark:text-gray-400 mb-6">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Jumat, 17 Oktober 2025</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>09.00 WIB</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>Kediaman Mempelai Putri</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Prosesi akad nikah akan dilaksanakan secara intimate dengan keluarga terdekat
                    </p>
                  </CardContent>
                </Card>

                {/* Resepsi */}
                <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:-rotate-1 animate-slide-right animation-delay-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-4">
                      <Heart className="h-12 w-12 text-pink-600 dark:text-pink-400 mx-auto group-hover:scale-110 transition-all duration-300 animate-heartbeat" fill="currentColor" />
                      <div className="absolute inset-0 h-12 w-12 text-pink-600 dark:text-pink-400 mx-auto animate-ping opacity-20">
                        <Heart className="h-12 w-12" fill="currentColor" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                      Resepsi Pernikahan
                    </h3>
                    <div className="space-y-3 text-gray-600 dark:text-gray-400 mb-6">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Jumat, 17 Oktober 2025</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>18.00 WIB s/d Selesai</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span>Lokasi Resepsi</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Perayaan kebahagiaan bersama keluarga, sahabat, dan orang-orang terkasih
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-serif text-amber-800 dark:text-amber-200 mb-4">Galeri Foto</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 mx-auto rounded-full animate-expand"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-2 animate-scale-up group cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-full h-full flex items-center justify-center rounded-2xl group-hover:bg-gradient-to-br group-hover:from-amber-200 group-hover:to-orange-300 dark:group-hover:from-amber-700 dark:group-hover:to-orange-800 transition-all duration-300">
                    <Camera className="h-8 w-8 text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Google Maps Section */}
        <section id="maps" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-serif text-amber-800 dark:text-amber-200 mb-4">Lokasi Acara</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 mx-auto rounded-full animate-expand"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-xl animate-fade-in animation-delay-300 overflow-hidden group">
                <CardContent className="p-0">
                  {/* Location Info */}
                  <div className="p-8 text-center">
                    <div className="relative mb-4">
                      <MapPin className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto group-hover:scale-110 transition-all duration-300 animate-bounce" />
                      <div className="absolute inset-0 h-12 w-12 text-green-600 dark:text-green-400 mx-auto animate-ping opacity-20">
                        <MapPin className="h-12 w-12" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Desa Gilang Gang Menteng</h3>
                    <div className="max-w-2xl mx-auto mb-6">
                      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-2">
                        RT.15 RW.04, Utara Rel Kereta
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Taman, Sidoarjo, Jawa Timur
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={() => window.open('https://maps.google.com/?q=Desa+Gilang+Gang+Menteng+Sidoarjo+Taman', '_blank')}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Buka Google Maps
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                      <Button 
                        onClick={() => window.open('https://goo.gl/maps/example', '_blank')}
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 transform hover:scale-105 transition-all duration-300"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Petunjuk Arah
                      </Button>
                    </div>
                  </div>

                  {/* Embedded Map */}
                  <div className="relative h-96 bg-gray-200 dark:bg-gray-700 animate-pulse">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.8234567890123!2d112.7180!3d-7.3441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjAnMzguOCJTIDExMsKwNDMnMDQuOCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 rounded-b-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-2xl"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gift Section */}
        <section id="gift" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-serif text-amber-800 dark:text-amber-200 mb-4">Amplop Digital</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 mx-auto rounded-full animate-expand"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-yellow-200 dark:border-yellow-800 shadow-xl animate-fade-in animation-delay-300">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="relative mb-4">
                      <Gift className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto animate-bounce" />
                      <div className="absolute inset-0 h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto animate-ping opacity-20">
                        <Gift className="h-12 w-12" />
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                      Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
                      Namun jika memberi adalah ungkapan tanda kasih, Anda dapat mengirim kado secara cashless.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* BCA Account */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 group">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              Bank BCA
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">Andika Ferdi Alvianto</p>
                          </div>
                          <Button
                            onClick={() => copyToClipboard("2740429496", "BCA")}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-300 dark:border-blue-700 transform hover:scale-105 transition-all duration-300"
                          >
                            {copiedAccount === "BCA" ? (
                              <Check className="h-4 w-4 text-green-600 animate-bounce" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            {copiedAccount === "BCA" ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                        <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-all duration-300">
                          274-042-9496
                        </p>
                      </CardContent>
                    </Card>

                    {/* BNI Account */}
                    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:-rotate-1 group">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                              Bank BNI
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">Ririn Sulistyani</p>
                          </div>
                          <Button
                            onClick={() => copyToClipboard("1903264869", "BNI")}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 border-orange-300 dark:border-orange-700 transform hover:scale-105 transition-all duration-300"
                          >
                            {copiedAccount === "BNI" ? (
                              <Check className="h-4 w-4 text-green-600 animate-bounce" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            {copiedAccount === "BNI" ? "Copied!" : "Copy"}
                          </Button>
                        </div>
                        <p className="text-2xl font-mono font-bold text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-all duration-300">
                          1903264869
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-serif text-amber-800 dark:text-amber-200 mb-4">Konfirmasi Kehadiran</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 mx-auto rounded-full animate-expand"></div>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl animate-fade-in animation-delay-300 transform hover:-translate-y-2 transition-all duration-500">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmitRSVP} className="space-y-6">
                    <div className="animate-slide-up animation-delay-500">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nama Lengkap *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full transition-all duration-300 transform focus:scale-105"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    
                    <div className="animate-slide-up animation-delay-700">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Konfirmasi Kehadiran *
                      </label>
                      <Select value={formData.attendance} onValueChange={(value) => handleInputChange('attendance', value)}>
                        <SelectTrigger className="w-full transition-all duration-300 transform focus:scale-105">
                          <SelectValue placeholder="Pilih konfirmasi kehadiran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hadir">Hadir</SelectItem>
                          <SelectItem value="tidak-hadir">Tidak Hadir</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="animate-slide-up animation-delay-900">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Jumlah Tamu
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={formData.guestCount}
                        onChange={(e) => handleInputChange('guestCount', e.target.value)}
                        className="w-full transition-all duration-300 transform focus:scale-105"
                        placeholder="Jumlah tamu yang hadir"
                      />
                    </div>

                    <div className="animate-slide-up animation-delay-1100">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ucapan & Doa
                      </label>
                      <Textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="w-full transition-all duration-300 transform focus:scale-105"
                        placeholder="Berikan ucapan dan doa untuk kami..."
                      />
                    </div>

                    <div className="animate-slide-up animation-delay-1300">
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 hover:from-amber-600 hover:to-orange-600 dark:hover:from-amber-700 dark:hover:to-orange-700 text-white py-3 rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Heart className="h-4 w-4 mr-2" fill="currentColor" />
                            Kirim Konfirmasi
                            <Send className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-amber-800 to-orange-800 dark:from-amber-900 dark:to-orange-900 text-white py-12 transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="mb-6 animate-fade-in">
                <div className="relative">
                  <Heart className="h-12 w-12 text-amber-300 dark:text-amber-400 mx-auto mb-4 animate-heartbeat" fill="currentColor" />
                  <div className="absolute inset-0 h-12 w-12 text-amber-300 dark:text-amber-400 mx-auto animate-ping opacity-20">
                    <Heart className="h-12 w-12" fill="currentColor" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif mb-2">Ririn & Andika</h3>
                <p className="text-amber-200 dark:text-amber-300">17 Oktober 2025</p>
              </div>

              <div className="mb-6 animate-slide-up animation-delay-300">
                <p className="text-amber-100 dark:text-amber-200 leading-relaxed max-w-2xl mx-auto">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i 
                  berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
                </p>
              </div>

              <div className="mb-6 animate-slide-up animation-delay-500">
                <p className="text-lg font-medium text-amber-200 dark:text-amber-300 mb-4">
                  Wassalamu'alaikum Warahmatullahi Wabarakatuh
                </p>
                <p className="text-2xl font-serif text-amber-300 dark:text-amber-400">Keluarga Kami</p>
              </div>

              <div className="flex justify-center space-x-4 mb-6 animate-slide-up animation-delay-700">
                <Button size="icon" variant="ghost" className="text-amber-300 dark:text-amber-400 hover:text-white hover:bg-amber-700 dark:hover:bg-amber-800 transform hover:scale-110 transition-all duration-300">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-amber-300 dark:text-amber-400 hover:text-white hover:bg-amber-700 dark:hover:bg-amber-800 transform hover:scale-110 transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-amber-300 dark:text-amber-400 hover:text-white hover:bg-amber-700 dark:hover:bg-amber-800 transform hover:scale-110 transition-all duration-300">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-amber-300 dark:text-amber-400 hover:text-white hover:bg-amber-700 dark:hover:bg-amber-800 transform hover:scale-110 transition-all duration-300">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>

              <div className="border-t border-amber-700 dark:border-amber-800 pt-6 animate-fade-in animation-delay-1000">
                <p className="text-amber-200 dark:text-amber-300 text-sm">
                  Made with ❤️ for Ririn & Andika Wedding • {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
