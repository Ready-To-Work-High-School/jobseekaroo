
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  percentage?: number;
  secondaryText?: string;
  progressColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
  percentage,
  secondaryText,
  progressColor
}) => {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {secondaryText && (
              <p className="text-xs text-muted-foreground mt-1">
                {secondaryText}
              </p>
            )}
            {percentage !== undefined && progressColor && (
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div 
                  className={`${progressColor} h-1.5 rounded-full`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            )}
          </div>
          <div className={`${iconBgColor} p-2 rounded-full`}>
            {React.cloneElement(icon as React.ReactElement, { 
              className: `h-5 w-5 ${iconColor}` 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
