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
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error('API response was not ok');
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('An error occurred. Please check the URL or try again later.');
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
