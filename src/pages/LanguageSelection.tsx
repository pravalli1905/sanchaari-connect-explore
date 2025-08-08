import { useState } from "react"
import { Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/layout/Navbar"
import { Link } from "react-router-dom"

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  
  const languages = [
    { 
      id: "english", 
      name: "English", 
      nativeName: "English",
      flag: "🇺🇸",
      sample: "Welcome to Sanchaari! Plan your next group trip."
    },
    { 
      id: "hindi", 
      name: "Hindi", 
      nativeName: "हिंदी",
      flag: "🇮🇳",
      sample: "सांचारी में आपका स्वागत है! अपनी अगली ग्रुप ट्रिप प्लान करें।"
    },
    { 
      id: "bengali", 
      name: "Bengali", 
      nativeName: "বাংলা",
      flag: "🇧🇩",
      sample: "সাঞ্চারীতে স্বাগতম! আপনার পরবর্তী গ্রুপ ট্রিপ পরিকল্পনা করুন।"
    },
    { 
      id: "tamil", 
      name: "Tamil", 
      nativeName: "தமிழ்",
      flag: "🇮🇳",
      sample: "சாஞ்சாரியில் வரவேற்கிறோம்! உங்கள் அடுத்த குழு பயணத்தைத் திட்டமிடுங்கள்।"
    },
    { 
      id: "telugu", 
      name: "Telugu", 
      nativeName: "తెలుగు",
      flag: "🇮🇳",
      sample: "సాంచారీకి స్వాగతం! మీ తదుపరి గ్రూప్ ట్రిప్‌ను ప్లాన్ చేయండి।"
    },
    { 
      id: "marathi", 
      name: "Marathi", 
      nativeName: "मराठी",
      flag: "🇮🇳",
      sample: "सांचारीमध्ये आपले स्वागत! आपला पुढील ग्रुप ट्रिप प्लॅन करा।"
    }
  ]

  const selectedLang = languages.find(lang => lang.id === selectedLanguage)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/profile">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2" size={20} />
              Back to Profile
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-4">
            Choose Your Language
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your preferred language for the interface and AI chatbot interactions
          </p>
        </div>

        {/* Language Preview */}
        {selectedLang && (
          <Card className="card-elevated mb-8">
            <CardHeader>
              <CardTitle className="text-center">Preview</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground">
                {selectedLang.sample}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Language Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {languages.map((language) => (
            <Card
              key={language.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedLanguage === language.id
                  ? "ring-2 ring-primary bg-gradient-to-br from-primary/5 to-primary-hover/5"
                  : "card-elevated hover:shadow-floating"
              }`}
              onClick={() => setSelectedLanguage(language.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{language.flag}</div>
                <h3 className="text-xl font-bold text-secondary mb-2">
                  {language.name}
                </h3>
                <p className="text-lg text-muted-foreground mb-4">
                  {language.nativeName}
                </p>
                
                {selectedLanguage === language.id && (
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center animate-scale-in">
                      <Check size={20} className="text-white" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        <Card className="card-elevated mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Language Changes</h4>
                <p className="text-blue-800 text-sm">
                  Changing your language will update the interface text and configure the AI chatbot 
                  to communicate in your selected language. You can change this anytime from your profile settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="text-center mb-8">
          <Button 
            className="bg-gradient-to-r from-primary to-primary-hover hover:scale-105 transition-transform px-12 py-3 text-lg"
            disabled={!selectedLanguage}
          >
            Save Language Preference
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelection