import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthMetricCardProps {
  icon: React.ReactElement;
  title: string;
  value: string;
  linkText: string;
  linkTo: string;
  className?: string;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  icon,
  title,
  value,
  linkText,
  linkTo,
  className
}) => {
  console.log('HealthMetricCard loaded for:', title);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {React.cloneElement(icon, { className: "h-4 w-4 text-muted-foreground" })}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-2xl font-bold">
          {value}
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-3 px-6">
        <Link 
          to={linkTo} 
          className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center"
        >
          {linkText}
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HealthMetricCard;