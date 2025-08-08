import { useState } from 'react';
import { Settings, Key, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

const ChatBotConfig = () => {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveConfig = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your Perplexity API key');
      return;
    }

    try {
      // Store API key securely (in a real app, this should be stored server-side)
      localStorage.setItem('perplexity_api_key', apiKey);
      setIsConfigured(true);
      toast.success('Chatbot configured successfully!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to save configuration');
    }
  };

  const getStoredApiKey = () => {
    return localStorage.getItem('perplexity_api_key') || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="fixed bottom-24 right-6 z-40">
          <Settings className="h-4 w-4 mr-2" />
          {isConfigured ? 'Chatbot Settings' : 'Setup Chatbot'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Chatbot Configuration
          </DialogTitle>
          <DialogDescription>
            Configure your AI chatbot with Perplexity API for enhanced travel assistance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              <strong>For Production:</strong> Add your Perplexity API key to Supabase Edge Function Secrets.
              <br />
              <strong>For Testing:</strong> Enter your API key below (stored locally).
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="api-key">Perplexity API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="pplx-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href="https://www.perplexity.ai/settings/api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Perplexity AI
              </a>
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveConfig} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBotConfig;