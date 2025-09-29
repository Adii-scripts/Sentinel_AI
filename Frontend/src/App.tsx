import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StarfieldBackground from "@/components/StarfieldBackground";
import URLForm from "@/components/URLForm";
import ResultsDisplay from "@/components/ResultsDisplay";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (url) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      setResult({
        verdict: 'Malicious',
        riskScore: 92,
        details: [
          'Uses IP Address',
          'Contains suspicious keyword: "login"',
          'Suspicious redirect patterns detected',
          'No valid SSL certificate found'
        ]
      });
    } catch (err) {
      setError('Failed to analyze URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StarfieldBackground />
        <Toaster />
        <Sonner />
        
        <main className="min-h-screen relative">
          <div className="container mx-auto p-4 md:p-8 max-w-4xl space-y-12">
            {/* Header */}
            <header className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-cosmic bg-gradient-cosmic bg-clip-text text-transparent drop-shadow-[0_0_20px_hsl(var(--primary))]">
                Sentinel AI
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced Intelligence Monitoring Platform - Analyze URLs for security threats and malicious content
              </p>
            </header>

            {/* URL Form */}
            <section className="space-y-6">
              <URLForm onSubmit={handleSubmit} isLoading={isLoading} />
            </section>

            {/* Results Display */}
            <section>
              <ResultsDisplay 
                isLoading={isLoading} 
                result={result} 
                error={error} 
              />
            </section>

            {/* Footer */}
            <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
              <p>&copy; 2024 Sentinel AI. Advanced threat detection powered by artificial intelligence.</p>
            </footer>
          </div>
        </main>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
