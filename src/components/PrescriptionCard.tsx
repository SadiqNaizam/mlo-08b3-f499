import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill } from 'lucide-react';

/**
 * Defines the possible refill statuses for a prescription.
 * - 'OK': Sufficient stock available.
 * - 'LOW': Stock is running low, a refill may be needed soon.
 * - 'REFILL_DUE': A refill is required.
 */
export type RefillStatus = 'OK' | 'LOW' | 'REFILL_DUE';

interface PrescriptionCardProps {
  medicationName: string;
  dosage: string;
  refillStatus: RefillStatus;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  medicationName,
  dosage,
  refillStatus,
}) => {
  console.log('PrescriptionCard loaded for:', medicationName);

  // Determine the badge variant and text based on the refill status.
  const getStatusDetails = (status: RefillStatus): { variant: "default" | "secondary" | "destructive", text: string } => {
    switch (status) {
      case 'REFILL_DUE':
        return { variant: 'destructive', text: 'Refill Due' };
      case 'LOW':
        return { variant: 'secondary', text: 'Stock Low' };
      case 'OK':
      default:
        // Using 'default' which is typically the primary theme color.
        return { variant: 'default', text: 'Refill OK' };
    }
  };

  const statusDetails = getStatusDetails(refillStatus);

  return (
    <Card className="w-full transition-shadow duration-300 hover:shadow-md flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{medicationName}</CardTitle>
          <Pill className="h-6 w-6 text-blue-500 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base">{dosage}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-end">
          <Badge variant={statusDetails.variant}>{statusDetails.text}</Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PrescriptionCard;