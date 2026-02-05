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
    <section id="book" className="py-24 lg:py-24 bg-background relative overflow-hidden">
      {/* Background number */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 font-serif text-[20rem] lg:text-[30rem] text-muted/30 select-none pointer-events-none leading-none">
        05
      </div>

      <div className="container mx-auto px-6 lg:px-16">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-ultra text-primary line-accent">
              Book Online
            </p>
            <h2 className="font-serif text-headline text-foreground mt-8 mb-8">
              Schedule your <span className="text-primary italic font-normal">visit</span>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
              Skip the wait. Book your appointment online and walk in at your scheduled time.
              We'll confirm via WhatsApp within minutes.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-border">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-foreground mb-1">Quick Confirmation</h4>
                  <p className="font-sans text-sm text-muted-foreground">
                    Get WhatsApp confirmation within 10 minutes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-border">
                  <Scissors size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-foreground mb-2">Expert Stylists</h4>
                  <ul className="space-y-1.5 font-sans text-sm text-muted-foreground list-disc pl-4 marker:text-primary/50">
                    <li>15+ years of professional grooming experience</li>
                    <li>Trained in modern & traditional techniques</li>
                    <li>Personalized consultation for every client</li>
                    <li>Specialists in beard shaping & skincare</li>
                    <li>Dedicated to precision and hygiene</li>
                    <li>Consistently rated 5-stars by locals</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10"
          >
            <form onSubmit={handleSubmit} className="bg-card border border-border p-6 lg:p-8 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
                  Your Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="pl-10 bg-background border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="pl-10 bg-background border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
                  Select Service
                </Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="bg-background border-border focus:border-primary">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background border-border",
                          !date && "text-muted-foreground"
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

                <div className="space-y-1">
                  <Label className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
                    Time
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="bg-background border-border focus:border-primary">
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
              <div className="space-y-1">
                <Label htmlFor="message" className="font-sans text-[10px] uppercase tracking-ultra text-muted-foreground">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any special requests or preferences..."
                  className="bg-background border-border focus:border-primary min-h-[70px] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-[11px] uppercase tracking-ultra py-6"
              >
                {isSubmitting ? 'Booking...' : 'Book Appointment'}
              </Button>

              <p className="font-sans text-[10px] text-center text-muted-foreground">
                You'll receive confirmation via WhatsApp
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}





