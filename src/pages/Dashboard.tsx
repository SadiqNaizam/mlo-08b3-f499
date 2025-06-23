import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HealthMetricCard from '@/components/HealthMetricCard';
import AppointmentCard from '@/components/AppointmentCard';
import PrescriptionCard, { RefillStatus } from '@/components/PrescriptionCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Calendar, Pill, ClipboardList, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  console.log('Dashboard loaded');

  // Placeholder data for demonstration
  const nextAppointment = {
    doctorName: 'Dr. Aiken',
    specialty: 'Cardiology',
    appointmentDateTime: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'Confirmed' as 'Confirmed' | 'Completed' | 'Cancelled',
  };

  const prescriptions = [
    {
      medicationName: 'Atorvastatin',
      dosage: '20mg, once daily',
      refillStatus: 'REFILL_DUE' as RefillStatus,
    },
    {
      medicationName: 'Metformin',
      dosage: '500mg, twice daily',
      refillStatus: 'OK' as RefillStatus,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          
          {/* Welcome Header */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-muted-foreground">Here's a summary of your health dashboard.</p>
          </section>

          {/* Health Metric Cards */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <HealthMetricCard
              icon={<Calendar />}
              title="Upcoming Appointments"
              value="1"
              linkText="View all appointments"
              linkTo="/appointments" // Path from App.tsx
              className="bg-blue-50 border-blue-200"
            />
            <HealthMetricCard
              icon={<Pill />}
              title="Active Prescriptions"
              value="2"
              linkText="Manage prescriptions"
              linkTo="/prescriptions" // Path from App.tsx
              className="bg-green-50 border-green-200"
            />
            <HealthMetricCard
              icon={<ClipboardList />}
              title="Medical Records"
              value="1 New Update"
              linkText="View records"
              linkTo="/medical-records" // Path from App.tsx
              className="bg-yellow-50 border-yellow-200"
            />
          </section>

          {/* Detailed Summary Sections */}
          <section className="grid gap-8 lg:grid-cols-5">

            {/* Upcoming Appointment Details */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Next Appointment</CardTitle>
                  <CardDescription>Your next scheduled visit.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AppointmentCard {...nextAppointment} />
                </CardContent>
              </Card>
            </div>
            
            {/* Prescription Status */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Prescription Status</CardTitle>
                  <CardDescription>Check your current medication refills.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prescriptions.map(p => (
                    <PrescriptionCard key={p.medicationName} {...p} />
                  ))}
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link to="/prescriptions">
                      View All Prescriptions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;