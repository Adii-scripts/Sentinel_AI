import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const ResultsDisplay = ({ isLoading, result, error }) => {
  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-card border-border">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Analyzing URL...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-card border-border">
        <CardContent className="p-6">
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              {error}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Result state
  if (result) {
    const getVerdictIcon = (verdict) => {
      switch (verdict?.toLowerCase()) {
        case 'safe':
          return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'moderate':
        case 'suspicious':
          return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case 'malicious':
          return <XCircle className="h-5 w-5 text-red-500" />;
        default:
          return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
      }
    };

    const getVerdictColor = (verdict) => {
      switch (verdict?.toLowerCase()) {
        case 'safe':
          return 'text-green-500 font-bold';
        case 'moderate':
        case 'suspicious':
          return 'text-yellow-500 font-bold';
        case 'malicious':
          return 'text-red-500 font-bold';
        default:
          return 'text-muted-foreground';
      }
    };

    const getRiskScoreColor = (score) => {
      if (score >= 80) return 'text-red-500';
      if (score >= 50) return 'text-yellow-500';
      return 'text-green-500';
    };

    return (
      <Card className="w-full max-w-4xl mx-auto bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Analysis Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Verdict and Risk Score */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {getVerdictIcon(result.verdict)}
                <div>
                  <p className="text-sm text-muted-foreground">Verdict</p>
                  <p className={`text-lg font-semibold ${getVerdictColor(result.verdict)}`}>
                    {result.verdict || 'Unknown'}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className={`text-2xl font-bold ${getRiskScoreColor(result.riskScore)}`}>
                  {result.riskScore !== undefined ? `${result.riskScore}/100` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">Details</h3>
              <div className="space-y-2">
                {result.details ? (
                  Array.isArray(result.details) ? (
                    result.details.map((detail, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        • {detail}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">{result.details}</p>
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">No additional details available.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Initial state
  return (
    <Card className="w-full max-w-4xl mx-auto bg-card border-border">
      <CardContent className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-center">
          Results will appear here after you analyze a URL.
        </p>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;