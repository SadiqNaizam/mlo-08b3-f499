import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { PlusCircle, ArrowLeft } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppointmentCard from '@/components/AppointmentCard';
import DoctorProfileCard from '@/components/DoctorProfileCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder Data
const initialAppointments: (Omit<React.ComponentProps<typeof AppointmentCard>, 'appointmentDateTime'> & { id: string, appointmentDateTime: Date })[] = [
  { id: '1', doctorName: 'Dr. Emily Carter', specialty: 'Cardiology', appointmentDateTime: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'Confirmed' },
  { id: '2', doctorName: 'Dr. Ben Hanson', specialty: 'Dermatology', appointmentDateTime: new Date(new Date().setDate(new Date().getDate() + 5)), status: 'Confirmed' },
  { id: '3', doctorName: 'Dr. Sophia Loren', specialty: 'General Checkup', appointmentDateTime: new Date(new Date().setDate(new Date().getDate() - 10)), status: 'Completed' },
  { id: '4', doctorName: 'Dr. Ben Hanson', specialty: 'Dermatology', appointmentDateTime: new Date(new Date().setDate(new Date().getDate() - 30)), status: 'Completed' },
  { id: '5', doctorName: 'Dr. Emily Carter', specialty: 'Cardiology', appointmentDateTime: new Date(new Date().setDate(new Date().getDate() - 45)), status: 'Cancelled' },
];

const doctorsData = [
  { id: 'doc1', name: 'Dr. Alan Grant', specialty: 'Pediatrics', imageUrl: 'https://i.pravatar.cc/150?u=alan' },
  { id: 'doc2', name: 'Dr. Ellie Sattler', specialty: 'Cardiology', imageUrl: 'https://i.pravatar.cc/150?u=ellie' },
  { id: 'doc3', name: 'Dr. Ian Malcolm', specialty: 'Dermatology', imageUrl: 'https://i.pravatar.cc/150?u=ian' },
  { id: 'doc4', name: 'Dr. John Hammond', specialty: 'General Checkup', imageUrl: 'https://i.pravatar.cc/150?u=john' },
];

// Form Schema
const FormSchema = z.object({
  specialty: z.string().min(1, { message: "Please select a specialty." }),
});

type Doctor = typeof doctorsData[0];

const AppointmentsPage = () => {
  console.log('AppointmentsPage loaded');
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<'findDoctor' | 'selectSlot'>('findDoctor');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { specialty: "" },
  });

  const handleSpecialtyChange = (specialty: string) => {
    if (specialty === 'all' || !specialty) {
      setFilteredDoctors(doctorsData);
    } else {
      setFilteredDoctors(doctorsData.filter(d => d.specialty === specialty));
    }
  };
  
  const handleDoctorSelect = (doctorId: string | number) => {
    const doctor = doctorsData.find(d => d.id === doctorId);
    if(doctor) {
      setSelectedDoctor(doctor);
      setBookingStep('selectSlot');
    }
  };
  
  const handleBookingConfirm = () => {
    if (!selectedDoctor || !selectedDate) {
      toast.error("Booking failed. Please select a doctor and a date.");
      return;
    }

    const newAppointment = {
      id: `new-${Date.now()}`,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      appointmentDateTime: selectedDate,
      status: 'Confirmed' as const,
    };

    setAppointments(prev => [newAppointment, ...prev].sort((a, b) => b.appointmentDateTime.getTime() - a.appointmentDateTime.getTime()));
    toast.success(`Appointment with ${selectedDoctor.name} confirmed!`);
    resetBookingFlow();
  };
  
  const resetBookingFlow = () => {
    setIsDialogOpen(false);
    // Timeout to allow dialog to close before resetting state
    setTimeout(() => {
        setBookingStep('findDoctor');
        setSelectedDoctor(null);
        setSelectedDate(new Date());
        form.reset();
        setFilteredDoctors(doctorsData);
    }, 300);
  };

  const upcomingAppointments = appointments.filter(a => a.appointmentDateTime >= new Date());
  const pastAppointments = appointments.filter(a => a.appointmentDateTime < new Date());

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-5 w-5" />
                Book New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col" onInteractOutside={(e) => {
                e.preventDefault(); // Prevent closing on outside click
            }}>
              {bookingStep === 'findDoctor' && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Find a Doctor</DialogTitle>
                    <DialogDescription>
                      Filter by specialty to find the right doctor for your needs.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4 flex-grow min-h-0">
                    <div className="md:col-span-1">
                      <Form {...form}>
                        <form className="space-y-4">
                          <FormField
                            control={form.control}
                            name="specialty"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Specialty</FormLabel>
                                <Select onValueChange={(value) => { field.onChange(value); handleSpecialtyChange(value); }} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a specialty" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="all">All Specialties</SelectItem>
                                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                                    <SelectItem value="General Checkup">General Checkup</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </div>
                    <div className="md:col-span-3">
                      <ScrollArea className="h-96 pr-4">
                        <div className="space-y-4">
                          {filteredDoctors.length > 0 ? filteredDoctors.map(doctor => (
                            <DoctorProfileCard key={doctor.id} {...doctor} onBook={handleDoctorSelect} />
                          )) : <p className="text-center text-muted-foreground p-4">No doctors found for this specialty.</p>}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="secondary" onClick={resetBookingFlow}>
                      Cancel
                    </Button>
                  </DialogFooter>
                </>
              )}
              {bookingStep === 'selectSlot' && selectedDoctor && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Book with {selectedDoctor.name}</DialogTitle>
                    <DialogDescription>
                      Select an available date for your appointment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center py-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                  </div>
                  <DialogFooter className="sm:justify-between">
                    <Button variant="outline" onClick={() => setBookingStep('findDoctor')}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Doctors
                    </Button>
                    <Button onClick={handleBookingConfirm} disabled={!selectedDate}>
                      Confirm Appointment
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-6">
            {upcomingAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingAppointments.map(app => <AppointmentCard key={app.id} {...app} />)}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">You have no upcoming appointments.</p>
            )}
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            {pastAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastAppointments.map(app => <AppointmentCard key={app.id} {...app} />)}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">You have no past appointments.</p>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AppointmentsPage;