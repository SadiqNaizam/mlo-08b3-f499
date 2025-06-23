import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, CalendarDays, Clock } from "lucide-react";

type AppointmentStatus = 'Confirmed' | 'Completed' | 'Cancelled';

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  appointmentDateTime: Date;
  status: AppointmentStatus;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorName,
  specialty,
  appointmentDateTime,
  status,
}) => {
  console.log('AppointmentCard loaded for:', doctorName);

  const getBadgeVariant = (status: AppointmentStatus): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'Completed':
        return 'secondary';
      case 'Cancelled':
        return 'destructive';
      case 'Confirmed':
      default:
        return 'default';
    }
  };

  const formattedDate = appointmentDateTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = appointmentDateTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Stethoscope className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl">{doctorName}</CardTitle>
            <CardDescription className="text-md">{specialty}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-gray-700">
          <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <Clock className="mr-2 h-4 w-4 text-gray-500" />
          <span>{formattedTime}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Badge variant={getBadgeVariant(status)} className="text-sm">
          {status}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;