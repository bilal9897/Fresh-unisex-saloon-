import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock, User, Phone, Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { openWhatsApp } from '@/lib/whatsapp';

const services = [
  'Hair Cut (Men)',
  'Hair Cut (Women)',
  'Beard Trim',
  'Hair Cut + Beard',
  'Clean Shave',
  'Hot Towel Shave',
  'Hair Smoothening',
  'Hair Spa',
  'Facial (Basic)',
  'Facial (Premium)',
  'Head Massage',
  'Full Body Massage',
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
];

export function BookingForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [date, setDate] = useState<Date>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !service || !date || !time) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to book an appointment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // IMPORTANT: must open WhatsApp directly from the submit gesture (no setTimeout),
    // otherwise popup blockers/iframes may block it.
    const whatsappText =
      `Hi! I'd like to book an appointment.\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n` +
      `Date: ${format(date, 'PPP')}\n` +
      `Time: ${time}` + (message ? `\n\nMessage: ${message}` : '');

    openWhatsApp({ text: whatsappText });

    toast({
      title: "Opening WhatsApp",
      description: "Send the message in WhatsApp and we'll confirm shortly.",
    });

    setIsSubmitting(false);
    setName('');
    setPhone('');
    setService('');
    setDate(undefined);
    setTime('');
    setMessage('');
  };

  return (
    <section id="book" className="py-10 sm:py-14 lg:py-20 bg-background relative overflow-hidden">
      {/* Background number (desktop only) */}
      <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 font-serif text-[26rem] text-muted/20 select-none pointer-events-none leading-none">
        05
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left column - Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              Book Online
            </p>
            <h2 className="font-serif text-3xl sm:text-headline text-foreground mt-4 mb-4">
              Schedule your <span className="text-primary italic font-normal">visit</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
              Skip the wait. Reserve your slot online and walk in smoothly. We confirm via WhatsApp within minutes.
            </p>

            {/* iOS Grouped Perks - Both in One Single Row */}
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-3.5 sm:p-4 shadow-[0_12px_36px_rgba(0,0,0,0.4)] grid grid-cols-2 gap-2.5 sm:gap-3 divide-x divide-white/10">
              <div className="flex items-center gap-2.5 sm:gap-3 pr-2 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                  <Clock size={15} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans text-xs sm:text-sm font-semibold text-white truncate">WhatsApp Confirm</h4>
                  <p className="font-sans text-[10px] sm:text-[11px] text-white/60 truncate">Within 10 mins</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-3.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                  <Scissors size={15} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans text-xs sm:text-sm font-semibold text-white truncate">Master Groomers</h4>
                  <p className="font-sans text-[10px] sm:text-[11px] text-white/60 truncate">15+ yrs experience</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - iOS Styled Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative z-10"
          >
            <form onSubmit={handleSubmit} className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[28px] p-6 lg:p-8 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="font-sans text-[10px] uppercase tracking-ultra text-white/60">
                  Your Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="pl-10 rounded-2xl bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="font-sans text-[10px] uppercase tracking-ultra text-white/60">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="pl-10 rounded-2xl bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="font-sans text-[10px] uppercase tracking-ultra text-white/60">
                  Select Service
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="rounded-2xl bg-white/5 border-white/15 text-white focus:border-primary">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="font-sans text-[10px] uppercase tracking-ultra text-white/60">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-2xl bg-white/5 border-white/15 text-white",
                          !date && "text-white/40"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "MMM d") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-1.5">
                  <Label className="font-sans text-[10px] uppercase tracking-ultra text-white/60">
                    Time
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="rounded-2xl bg-white/5 border-white/15 text-white focus:border-primary">
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="font-sans text-[10px] uppercase tracking-ultra text-white/60">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Special preferences..."
                  className="rounded-2xl bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-primary min-h-[60px] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs py-3.5 rounded-2xl shadow-lg shadow-white/5 active:scale-[0.98] transition-all"
              >
                {isSubmitting ? 'Booking...' : 'Confirm on WhatsApp'}
              </Button>

              <p className="font-sans text-[11px] text-center text-white/50">
                Direct booking confirmation via WhatsApp
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}





