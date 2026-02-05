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
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-[100]"
                >
                    <div className="bg-card border border-border p-6 shadow-2xl backdrop-blur-lg">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Dismiss"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                                <Download size={24} className="text-primary" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-serif text-lg text-foreground mb-2">
                                    Install Fresh Saloon
                                </h3>
                                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                                    Add our app to your home screen for quick access and a better experience.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleInstall}
                                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-sans text-[11px] uppercase tracking-ultra py-3 px-4 transition-colors"
                                    >
                                        Install
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        className="flex-1 border border-border text-foreground hover:border-primary hover:text-primary font-sans text-[11px] uppercase tracking-ultra py-3 px-4 transition-colors"
                                    >
                                        Not Now
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
