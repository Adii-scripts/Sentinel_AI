import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const URLForm = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && onSubmit) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a URL to analyze..."
          className="w-full bg-card border-border text-card-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
          disabled={isLoading}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !url.trim()}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? 'Analyzing...' : 'Analyze URL'}
      </Button>
    </form>
  );
};

export default URLForm;