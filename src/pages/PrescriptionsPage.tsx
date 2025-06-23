import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PrescriptionCard, { RefillStatus } from '@/components/PrescriptionCard';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

// Sample data for prescriptions to simulate a user's medication list.
const prescriptions = [
  {
    id: 1,
    medicationName: 'Metformin',
    dosage: '500mg, twice daily with meals',
    refillStatus: 'OK' as RefillStatus,
  },
  {
    id: 2,
    medicationName: 'Lisinopril',
    dosage: '10mg, once daily in the morning',
    refillStatus: 'LOW' as RefillStatus,
  },
  {
    id: 3,
    medicationName: 'Atorvastatin',
    dosage: '20mg, once daily at night',
    refillStatus: 'REFILL_DUE' as RefillStatus,
  },
  {
    id: 4,
    medicationName: 'Amoxicillin',
    dosage: '500mg, three times daily (Completed Course)',
    refillStatus: 'OK' as RefillStatus, // Completed courses don't need a refill status but 'OK' is a safe default
  },
   {
    id: 5,
    medicationName: 'Ibuprofen',
    dosage: '200mg, as needed for pain',
    refillStatus: 'OK' as RefillStatus,
  },
  {
    id: 6,
    medicationName: 'Levothyroxine',
    dosage: '50mcg, once daily before breakfast',
    refillStatus: 'LOW' as RefillStatus,
  }
];

const PrescriptionsPage = () => {
  console.log('PrescriptionsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-blue-50/50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section aria-labelledby="prescriptions-heading">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 id="prescriptions-heading" className="text-3xl font-bold text-gray-800">
              My Prescriptions
            </h1>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Prescription
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {prescriptions.map((prescription) => (
              <PrescriptionCard
                key={prescription.id}
                medicationName={prescription.medicationName}
                dosage={prescription.dosage}
                refillStatus={prescription.refillStatus}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrescriptionsPage;