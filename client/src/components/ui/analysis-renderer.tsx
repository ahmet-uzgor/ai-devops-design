import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface AnalysisRendererProps {
  data: any;
  title?: string;
  level?: number;
}

export function AnalysisRenderer({ data, title, level = 0 }: AnalysisRendererProps) {
  if (data === null || data === undefined) {
    return <span className="text-muted-foreground italic">null</span>;
  }

  const isScoreOrPercentage = (value: number, key?: string): boolean => {
    if (typeof value !== 'number') return false;
    
    // Check if key suggests it's a score or percentage
    const scoreKeywords = ['score', 'quality', 'coverage', 'maintainability', 'security', 'performance', 'overall', 'infrastructure'];
    const keyLower = key?.toLowerCase() || '';
    const hasScoreKeyword = scoreKeywords.some(keyword => keyLower.includes(keyword));
    
    // Value is between 0-100 and key suggests it's a score
    return value >= 0 && value <= 100 && hasScoreKeyword;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const renderValue = (value: any, key?: string, depth: number = 0): JSX.Element => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">null</span>;
    }

    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? 'default' : 'secondary'} className="ml-2">
          {String(value)}
        </Badge>
      );
    }

    if (typeof value === 'number' && isScoreOrPercentage(value, key)) {
      const colorClass = getScoreColor(value);
      return (
        <div className="flex items-center gap-3 mt-1" data-testid={`score-indicator-${key}`}>
          <div className="flex-1 max-w-xs">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div 
                className={`h-full transition-all ${colorClass}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-semibold text-foreground min-w-[3rem]">
            {value}%
          </span>
        </div>
      );
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <span className="text-foreground font-medium">
          {String(value)}
        </span>
      );
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-muted-foreground italic">Empty array</span>;
      }

      const allPrimitives = value.every(
        item => typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean'
      );

      if (allPrimitives) {
        return (
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            {value.map((item, index) => (
              <li key={index} className="text-sm text-foreground">
                {renderValue(item, undefined, depth + 1)}
              </li>
            ))}
          </ul>
        );
      }

      return (
        <div className="space-y-3 mt-2">
          {value.map((item, index) => (
            <div key={index} className={`p-3 border rounded-lg bg-card ${depth > 0 ? 'ml-4' : ''}`}>
              {typeof item === 'object' && item !== null ? (
                <div className="space-y-2">
                  {Object.entries(item).map(([itemKey, itemValue]) => (
                    <div key={itemKey} className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        {formatKey(itemKey)}:
                      </span>
                      <div className="ml-2">
                        {renderValue(itemValue, itemKey, depth + 1)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                renderValue(item, undefined, depth + 1)
              )}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'object') {
      return (
        <div className={`space-y-2 ${depth > 0 ? 'ml-4 p-3 border rounded-lg bg-card/50 mt-2' : ''}`}>
          {Object.entries(value).map(([objKey, objValue]) => (
            <div key={objKey} className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                {formatKey(objKey)}:
              </span>
              <div className="ml-2">
                {renderValue(objValue, objKey, depth + 1)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  const formatKey = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const isObject = typeof data === 'object' && !Array.isArray(data) && data !== null;
  
  if (level === 0 && isObject) {
    return (
      <div className="space-y-6" data-testid="analysis-renderer">
        {Object.entries(data).map(([key, value]) => {
          const shouldSkipKey = key === 'raw' || value === null || value === undefined;
          if (shouldSkipKey) return null;

          return (
            <div key={key} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                {formatKey(key)}
              </h3>
              <div className="pl-2">
                {renderValue(value, key)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <div data-testid="analysis-renderer">{renderValue(data, title)}</div>;
}
