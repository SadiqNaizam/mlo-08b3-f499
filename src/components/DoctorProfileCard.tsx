import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Stethoscope, ArrowRight } from 'lucide-react';

interface DoctorProfileCardProps {
  id: string | number;
  name: string;
  specialty: string;
  imageUrl: string;
  onBook: (doctorId: string | number) => void;
}

const DoctorProfileCard: React.FC<DoctorProfileCardProps> = ({
  id,
  name,
  specialty,
  imageUrl,
  onBook,
}) => {
  console.log(`DoctorProfileCard loaded for: ${name}`);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={imageUrl} alt={`Photo of Dr. ${name}`} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-bold text-lg text-gray-800 flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" />
              {name}
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              <Stethoscope className="mr-2 h-4 w-4 text-blue-500" />
              {specialty}
            </p>
          </div>
        </div>
        <Button onClick={() => onBook(id)} size="sm">
          View Availability
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorProfileCard;