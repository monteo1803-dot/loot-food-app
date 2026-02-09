
import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
    xp?: number;
}

interface ToastNotificationProps {
    toast: Toast;
    onClose: (id: number) => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 4000);

        return () => clearTimeout(timer);
    }, [toast.id, onClose]);

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBgColor = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'info':
                return 'bg-blue-50 border-blue-200';
        }
    };

    return (
        <div
            className={`
        flex items-center gap-3 p-4 rounded-2xl border-2 shadow-xl
        animate-in slide-in-from-right duration-300
        ${getBgColor()}
      `}
        >
            {getIcon()}
            <div className="flex-grow">
                <span className="font-bold text-gray-900">{toast.message}</span>
                {toast.xp && (
                    <span className="ml-2 bg-yellow-400 text-black text-xs font-black px-2 py-0.5 rounded-full">
                        +{toast.xp} XP
                    </span>
                )}
            </div>
            <button
                onClick={() => onClose(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

// Toast Container Component
interface ToastContainerProps {
    toasts: Toast[];
    onClose: (id: number) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
    return (
        <div className="fixed top-24 right-4 z-50 space-y-3 w-80">
            {toasts.map((toast) => (
                <ToastNotification key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </div>
    );
};

// Hook for managing toasts
export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    let toastId = 0;

    const addToast = (message: string, type: ToastType = 'info', xp?: number) => {
        const newToast: Toast = {
            id: Date.now() + Math.random(),
            message,
            type,
            xp,
        };
        setToasts(prev => [...prev, newToast]);
    };

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return { toasts, addToast, removeToast };
};

export default ToastNotification;
