import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);

            // Show prompt after 3 seconds delay
            setTimeout(() => {
                setShowPrompt(true);
            }, 3000);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }

        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        // Don't show again for 7 days
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    // Check if user dismissed recently
    useEffect(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed) {
            const dismissedTime = parseInt(dismissed);
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - dismissedTime < sevenDays) {
                setShowPrompt(false);
            }
        }
    }, []);

    return (
        <AnimatePresence>
            {showPrompt && deferredPrompt && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-80 z-[100]"
                >
                    <div className="bg-card border border-border p-4 shadow-xl backdrop-blur-lg rounded-lg">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors p-1"
                            aria-label="Dismiss"
                        >
                            <X size={14} />
                        </button>

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 rounded-md">
                                <Download size={18} className="text-primary" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-serif text-sm font-medium text-foreground mb-1">
                                    Install App
                                </h3>
                                <p className="font-sans text-[11px] text-muted-foreground leading-snug mb-3 pr-4">
                                    Add to home screen for quick access.
                                </p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleInstall}
                                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-[10px] uppercase tracking-wider py-2 px-3 rounded-sm transition-colors text-center"
                                    >
                                        Install
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        className="flex-1 border border-border text-foreground hover:border-primary hover:text-primary font-sans text-[10px] uppercase tracking-wider py-2 px-3 rounded-sm transition-colors text-center"
                                    >
                                        Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
