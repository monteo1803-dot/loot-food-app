import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 * 
 * @example
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        // Update state so the next render shows the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to console in development
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        // Store error info for display
        this.setState({ errorInfo });

        // Call optional error callback
        this.props.onError?.(error, errorInfo);
    }

    handleRetry = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    handleGoHome = (): void => {
        window.location.href = '/';
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 p-4">
                    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
                        {/* Error Icon */}
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>

                        {/* Error Title */}
                        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                            Oups ! Quelque chose s'est mal passé
                        </h1>

                        {/* Error Description */}
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Une erreur inattendue s'est produite. Veuillez réessayer ou retourner à l'accueil.
                        </p>

                        {/* Error Details (Dev mode) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-6 text-left">
                                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                    Détails techniques
                                </summary>
                                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-900 rounded-xl text-xs text-red-600 dark:text-red-400 overflow-auto max-h-40">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={this.handleRetry}
                                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-loot-red text-white font-bold hover:bg-red-700 transition-all hover:scale-105"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Réessayer
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all hover:scale-105"
                            >
                                <Home className="w-5 h-5" />
                                Accueil
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
