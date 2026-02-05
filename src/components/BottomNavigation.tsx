import { useState, useEffect } from 'react';
import { Home, Scissors, Image, Phone, Calendar } from 'lucide-react';
 import { cn } from '@/lib/utils';
 
 const navItems = [
   { href: '#', icon: Home, label: 'Home' },
   { href: '#services', icon: Scissors, label: 'Services' },
   { href: '#book', icon: Calendar, label: 'Book' },
   { href: '#gallery', icon: Image, label: 'Gallery' },
   { href: '#contact', icon: Phone, label: 'Contact' },
 ];
 
 export function BottomNavigation() {
   const [activeSection, setActiveSection] = useState('#');
 
   useEffect(() => {
     const handleScroll = () => {
       const sections = ['contact', 'gallery', 'book', 'services', 'about'];
       const scrollY = window.scrollY + 200;
       
       for (const section of sections) {
         const element = document.getElementById(section);
         if (element && scrollY >= element.offsetTop) {
           setActiveSection(`#${section}`);
           return;
         }
       }
       setActiveSection('#');
     };
 
     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll);
   }, []);
 
   return (
     <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
       {/* Backdrop blur */}
       <div className="absolute inset-0 bg-card/90 backdrop-blur-lg border-t border-border" />
       
       <div className="relative flex items-center justify-around px-2 py-2 safe-area-bottom">
         {navItems.map((item) => {
           const Icon = item.icon;
           const isActive = activeSection === item.href || 
             (item.href === '#' && activeSection === '#');
           
           return (
             <a
               key={item.href}
               href={item.href}
               className={cn(
                 "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                 isActive 
                   ? "text-primary" 
                   : "text-muted-foreground"
               )}
             >
               <Icon 
                 size={22} 
                 strokeWidth={isActive ? 2 : 1.5}
                 className={cn(
                   "transition-transform duration-300",
                   isActive && "scale-110"
                 )}
               />
               <span className={cn(
                 "text-[9px] uppercase tracking-wider font-medium",
                 isActive ? "opacity-100" : "opacity-70"
               )}>
                 {item.label}
               </span>
             </a>
           );
         })}
       </div>
     </nav>
   );
 }