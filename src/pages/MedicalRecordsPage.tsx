import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileText } from 'lucide-react';

// Placeholder data for medical records, organized by category
const medicalRecordCategories = [
  {
    category: "Lab Results",
    value: "lab-results",
    records: [
      { id: "lab001", date: "2024-05-20", name: "Complete Blood Count", type: "Blood Test", downloadLink: "#" },
      { id: "lab002", date: "2024-03-15", name: "Lipid Panel", type: "Blood Test", downloadLink: "#" },
      { id: "lab003", date: "2023-11-02", name: "Thyroid Function Test", type: "Hormone Test", downloadLink: "#" },
    ],
  },
  {
    category: "Imaging Reports",
    value: "imaging-reports",
    records: [
      { id: "img001", date: "2024-04-10", name: "Chest X-Ray Report", type: "X-Ray", downloadLink: "#" },
      { id: "img002", date: "2023-09-22", name: "Abdominal Ultrasound Findings", type: "Ultrasound", downloadLink: "#" },
    ],
  },
  {
    category: "Consultation Notes",
    value: "consultation-notes",
    records: [
      { id: "con001", date: "2024-05-01", name: "Follow-up with Dr. Anya Sharma", type: "Doctor's Note", downloadLink: "#" },
      { id: "con002", date: "2023-12-18", name: "Initial Consultation with Dr. Ben Carter", type: "Doctor's Note", downloadLink: "#" },
    ],
  },
];

const MedicalRecordsPage = () => {
  console.log('MedicalRecordsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-800">Medical Records</h1>
              <p className="text-muted-foreground mt-1">A secure repository of your health documents.</p>
            </div>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload New Record
            </Button>
          </div>
        </section>

        <section>
          <Accordion type="multiple" defaultValue={['lab-results']} className="w-full">
            {medicalRecordCategories.map(category => (
              <AccordionItem value={category.value} key={category.value}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    {category.category}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {category.records.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[150px]">Date</TableHead>
                          <TableHead>Document Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {category.records.map(record => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.date}</TableCell>
                            <TableCell>{record.name}</TableCell>
                            <TableCell><Badge variant="secondary">{record.type}</Badge></TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" asChild>
                                <a href={record.downloadLink}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </a>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center text-muted-foreground p-8">
                      No records found in this category.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MedicalRecordsPage;