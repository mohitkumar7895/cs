import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DigAssist India | अधिकृत ई-सुविधा केंद्र • UDYAM-UP-27-0070488 | फ़िरोज़ाबाद',
  description: 'सरकारी व व्यापारिक सेवाओं का स्मार्ट व सटीक समाधान। पुलिस चरित्र प्रमाण पत्र, नया पैन कार्ड, GST नया पंजीकरण, ट्रैफिक चालान लोक अदालत, भूलेख खतौनी व वृद्धावस्था पेंशन। संस्थापक: शान मोहम्मद।',
  keywords: [
    'DigAssist India',
    'UDYAM-UP-27-0070488',
    'Shan Mohammad',
    'शान मोहम्मद',
    'E-Suvidha Kendra Firozabad',
    'UPCOP Police Verification',
    'PAN Card Form 49A',
    'GST Registration Firozabad',
    'Traffic Challan Lok Adalat',
    'Bhulekh Khatauni Nakal',
    'UP Old Age Pension'
  ],
  authors: [{ name: 'Shan Mohammad' }],
  openGraph: {
    title: 'DigAssist India - सरकारी व व्यापारिक सेवाओं का स्मार्ट समाधान',
    description: 'अधिकृत ई-सुविधा केंद्र • रामगढ़ रोड, फ़िरोज़ाबाद (उ.प्र.)। 100% ऑनलाइन व सुरक्षित प्रक्रिया।',
    siteName: 'DigAssist India',
    images: [
      {
        url: '/images/hero-banner.jpg',
        width: 1200,
        height: 675,
        alt: 'DigAssist India Banner'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="scroll-smooth bg-white text-slate-900">
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
