import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "pending" | "uploaded" | "verified";
  onUpload: (file: File) => void;
}



export const DocumentCard = ({ title, description, icon, status, onUpload }: DocumentCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      onUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      onUpload(file);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "verified":
        return "text-success";
      case "uploaded":
        return "text-pending";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "uploaded":
        return <Clock className="h-5 w-5 text-pending" />;
      default:
        return null;
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case "verified":
        return "border-success/50 bg-success/5";
      case "uploaded":
        return "border-pending/50 bg-pending/5";
      default:
        return "border-border";
    }
  };

  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", getBorderColor())}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          {getStatusIcon()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {status === "pending" ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              Drag and drop your file here, or
            </p>
            <Label htmlFor={`file-${title}`} className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <span>Browse Files</span>
              </Button>
              <Input
                id={`file-${title}`}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </Label>
            <p className="text-xs text-muted-foreground mt-2">
              PDF, JPG, JPEG, PNG (Max 10MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">{uploadedFile || "Document uploaded"}</p>
              <p className={cn("text-xs", getStatusColor())}>
                {status === "verified" ? "Verified" : "Under Review"}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};