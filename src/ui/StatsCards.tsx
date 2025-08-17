
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import type { LucideIcon } from 'lucide-react';

interface StatCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle: string;
  variant?: 'primary' | 'secondary' | 'warning'; 
  badge?: string;
}

interface StatsCardsProps {
  cards: StatCardData[];
  className?: string;
}

export function StatsCards({ cards, className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }: StatsCardsProps) {
  const getIconStyles = (variant: StatCardData['variant'] = 'secondary') => {
    switch (variant) {
      case 'primary':
        return 'p-2 bg-primary rounded text-primary-foreground';
      case 'warning':
        return 'p-2 bg-destructive/10 rounded text-destructive';
      default:
        return 'p-2 bg-muted rounded text-muted-foreground';
    }
  };

  const getValueStyles = (variant: StatCardData['variant'] = 'secondary') => {
    switch (variant) {
      case 'warning':
        return 'text-xl font-medium text-destructive';
      default:
        return 'text-xl font-medium text-foreground';
    }
  };

  return (
    <div className={className}>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.id} className="border border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={getIconStyles(card.variant)}>
                  <Icon className="w-4 h-4" />
                </div>
                {card.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {card.badge}
                  </Badge>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className={getValueStyles(card.variant)}>{card.value}</p>
                </div>
                <p className="text-xs text-muted-foreground">{card.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}