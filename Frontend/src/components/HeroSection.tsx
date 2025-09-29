import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main heading */}
        <div className="space-y-4 animate-float">
          <h1 className="text-6xl md:text-8xl font-bold text-cosmic leading-tight">
            SENTINEL AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Advanced artificial intelligence monitoring and analysis platform for the next generation of digital security
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-glow-primary transition-all duration-300 hover:shadow-glow-accent"
          >
            Launch Dashboard
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 text-primary hover:bg-primary/10 px-8 py-3 rounded-full font-semibold backdrop-blur-sm"
          >
            Learn More
          </Button>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="glass p-6 hover:shadow-cosmic transition-all duration-300 group">
            <div className="text-primary text-3xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">Real-time Monitoring</h3>
            <p className="text-muted-foreground text-sm">
              Continuous surveillance with AI-powered threat detection and analysis
            </p>
          </Card>

          <Card className="glass p-6 hover:shadow-cosmic transition-all duration-300 group">
            <div className="text-primary text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">Lightning Fast</h3>
            <p className="text-muted-foreground text-sm">
              Microsecond response times with quantum-enhanced processing algorithms
            </p>
          </Card>

          <Card className="glass p-6 hover:shadow-cosmic transition-all duration-300 group">
            <div className="text-primary text-3xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold mb-2 text-card-foreground">Adaptive Learning</h3>
            <p className="text-muted-foreground text-sm">
              Self-improving neural networks that evolve with emerging security patterns
            </p>
          </Card>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center space-x-3 mt-12">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground font-mono">
            SYSTEM STATUS: OPERATIONAL
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;