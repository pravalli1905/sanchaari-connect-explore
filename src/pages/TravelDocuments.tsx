import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, CheckCircle, X, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const TravelDocuments = () => {
  const { groupId } = useParams();
  const [uploading, setUploading] = useState<string | null>(null);

  const documents = [
    { id: 'passport', name: 'Passport', required: true, status: 'verified', file: 'passport_copy.pdf' },
    { id: 'visa', name: 'Visa', required: true, status: 'pending', file: 'visa_application.pdf' },
    { id: 'vaccination', name: 'Vaccination Certificate', required: false, status: 'missing', file: null },
    { id: 'travel_insurance', name: 'Travel Insurance', required: false, status: 'rejected', file: 'insurance_old.pdf', reason: 'Document expired' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'missing': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      case 'missing': return <Upload className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleFileUpload = (docId: string, file: File) => {
    setUploading(docId);
    // Simulate upload
    setTimeout(() => {
      setUploading(null);
      toast.success('Document uploaded successfully');
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/groups/${groupId}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Travel Documents</h1>
              <p className="text-muted-foreground">Upload and verify your travel documents</p>
            </div>
          </div>

          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              All documents are encrypted and stored securely. We follow strict privacy policies to protect your data.
              <Link to="/privacy" className="text-primary hover:underline ml-1">Learn more</Link>
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {doc.name}
                        {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                      </CardTitle>
                      <CardDescription>
                        {doc.status === 'verified' && 'Document verified successfully'}
                        {doc.status === 'pending' && 'Under review by our team'}
                        {doc.status === 'missing' && 'Please upload this document'}
                        {doc.status === 'rejected' && `Rejected: ${doc.reason}`}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {doc.file && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="flex-1 text-sm">{doc.file}</span>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    )}

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          {doc.file ? 'Upload a new version' : 'Drag and drop or click to upload'}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Supports: JPG, PNG, PDF (max 10MB)
                        </p>
                        <Input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="hidden"
                          id={`upload-${doc.id}`}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          }}
                        />
                        <Label htmlFor={`upload-${doc.id}`}>
                          <Button variant="outline" className="cursor-pointer" asChild>
                            <span>
                              {uploading === doc.id ? 'Uploading...' : 'Choose File'}
                            </span>
                          </Button>
                        </Label>
                      </div>
                    </div>

                    {doc.status === 'rejected' && (
                      <Alert className="border-red-200 bg-red-50">
                        <X className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Rejection Reason:</strong> {doc.reason}
                          <br />
                          Please upload a new document that meets the requirements.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Document Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium">File Requirements:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Clear, high-resolution images or PDFs</li>
                  <li>All text must be clearly readable</li>
                  <li>Documents must be valid and not expired</li>
                  <li>File size must be under 10MB</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Processing Time:</h4>
                <p className="text-muted-foreground">
                  Documents are typically reviewed within 24 hours during business days.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center mt-8">
            <Button variant="outline" asChild>
              <Link to={`/groups/${groupId}`}>
                Back to Group
              </Link>
            </Button>
            <Button asChild>
              <Link to="/help/chat">
                Need Help?
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelDocuments;