import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DocumentCard } from "./DocumentCard";
import { 
  CreditCard, 
  FileText, 
  Vote, 
  UserCheck, 
  Shield, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Car,
  Plane,
  Home,
  Banknote,
  MapPin,
  Award,
  ScrollText,
  Building
} from "lucide-react";



interface DocumentStatus {
  [key: string]: "pending" | "uploaded" | "verified";
}

interface UploadedDocument {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "uploaded" | "verified";
  uploadedAt: Date;
}

const availableDocuments = [
  {
    id: "aadhar",
    title: "Aadhar Card",
    description: "Identity proof document issued by UIDAI",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "pan",
    title: "PAN Card", 
    description: "Permanent Account Number card",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "voter",
    title: "Voter ID",
    description: "Election Commission identity card",
    icon: <Vote className="h-5 w-5" />,
  },
  {
    id: "samagra",
    title: "Samagra ID",
    description: "Madhya Pradesh family identification card",
    icon: <UserCheck className="h-5 w-5" />,
  },
  {
    id: "driving_license",
    title: "Driving License",
    description: "Motor vehicle driving authorization",
    icon: <Car className="h-5 w-5" />,
  },
  {
    id: "passport",
    title: "Passport",
    description: "International travel document",
    icon: <Plane className="h-5 w-5" />,
  },
  {
    id: "ration_card",
    title: "Ration Card",
    description: "Food security and identification document",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: "bank_passbook",
    title: "Bank Passbook",
    description: "Bank account verification document",
    icon: <Banknote className="h-5 w-5" />,
  },
  {
    id: "property_documents",
    title: "Property Documents",
    description: "Land/property ownership papers",
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: "income_certificate",
    title: "Income Certificate",
    description: "Government issued income verification",
    icon: <Award className="h-5 w-5" />,
  },
  {
    id: "caste_certificate",
    title: "Caste Certificate",
    description: "Community/caste verification document",
    icon: <ScrollText className="h-5 w-5" />,
  },
  {
    id: "domicile_certificate",
    title: "Domicile Certificate",
    description: "Residence/domicile verification",
    icon: <MapPin className="h-5 w-5" />,
  },
];

export const AdminDashboard = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const handleUpload = (documentId: string, file: File) => {
    // Find document details
    const docDetails = availableDocuments.find(doc => doc.id === documentId);
    if (!docDetails) return;

    // Add to uploaded documents if not already there
    setUploadedDocuments(prev => {
      const existing = prev.find(doc => doc.id === documentId);
      if (existing) {
        // Update existing document status
        return prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, status: "uploaded" as const }
            : doc
        );
      } else {
        // Add new document
        return [...prev, {
          ...docDetails,
          status: "uploaded" as const,
          uploadedAt: new Date()
        }];
      }
    });

    // Simulate verification after 3 seconds
    setTimeout(() => {
      setUploadedDocuments(prev =>
        prev.map(doc =>
          doc.id === documentId
            ? { ...doc, status: "verified" as const }
            : doc
        )
      );
    }, 3000);
  };

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const getVerificationStats = () => {
    const verified = uploadedDocuments.filter(doc => doc.status === "verified").length;
    const uploaded = uploadedDocuments.filter(doc => doc.status === "uploaded").length;
    const pending = uploadedDocuments.filter(doc => doc.status === "pending").length;
    const total = uploadedDocuments.length;
    
    return { verified, uploaded, pending, total };
  };

  const { verified, uploaded, pending, total } = getVerificationStats();
  const progressPercentage = total > 0 ? (verified / total) * 100 : 0;

  // Get documents to display (uploaded + selected but not uploaded)
  const documentsToShow = [
    ...uploadedDocuments,
    ...selectedDocuments
      .filter(id => !uploadedDocuments.find(doc => doc.id === id))
      .map(id => {
        const docDetails = availableDocuments.find(doc => doc.id === id)!;
        return {
          ...docDetails,
          status: "pending" as const,
          uploadedAt: new Date()
        };
      })
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">

        {/* Document Selection */}
        {documentsToShow.length === 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Select Documents to Upload</CardTitle>
              <p className="text-muted-foreground">Choose the documents you want to verify</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableDocuments.map((doc) => (
                  <Card 
                    key={doc.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedDocuments.includes(doc.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border'
                    }`}
                    onClick={() => handleDocumentSelect(doc.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {doc.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{doc.title}</h3>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        </div>
                        {selectedDocuments.includes(doc.id) && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {selectedDocuments.length > 0 && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {selectedDocuments.length} document(s) selected. Click on any document above to upload it.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Overview Cards - only show if documents are uploaded */}
        {total > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{total}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-success">{verified}</div>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Under Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-pending">{uploaded}</div>
                  <Clock className="h-5 w-5 text-pending" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-destructive">{pending}</div>
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Section - only show if documents are uploaded */}
        {total > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Verification Progress</CardTitle>
                <Badge variant={progressPercentage === 100 ? "default" : "secondary"}>
                  {Math.round(progressPercentage)}% Complete
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {verified} of {total} documents verified
              </p>
            </CardContent>
          </Card>
        )}

        {/* All Verified Banner */}
        {total > 0 && verified === total && (
          <Card className="mb-8 border-success bg-success/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="h-8 w-8 text-success" />
                <div>
                  <h3 className="text-xl font-semibold text-success">All Documents Verified!</h3>
                  <p className="text-success/80">Your account is fully verified and ready to use.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Document Cards Grid */}
        {documentsToShow.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Document Upload</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedDocuments([]);
                  setUploadedDocuments([]);
                }}
              >
                Reset Selection
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documentsToShow.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title}
                  description={doc.description}
                  icon={doc.icon}
                  status={doc.status}
                  onUpload={(file) => handleUpload(doc.id, file)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};