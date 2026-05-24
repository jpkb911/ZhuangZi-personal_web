import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper border border-ink-200 rounded-lg shadow-xl w-full max-w-lg overflow-hidden relative"
            >
              <div className="p-6 border-b border-ink-100 flex justify-between items-center bg-ink-50">
                <h3 className="text-2xl font-serif font-bold text-ink-900">{title}</h3>
                <button onClick={onClose} className="text-ink-500 hover:text-ink-900 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 font-serif text-lg leading-relaxed text-ink-800 max-h-[70vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
