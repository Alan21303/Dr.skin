import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Upload, Image as ImageIcon, AlertCircle, ChevronDown, ChevronUp, Menu, X } from 'lucide-react'

export default function SkinDiseaseIdentifier() {
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(true)
  const [showDescription, setShowDescription] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        // Here you would typically send the image to your backend for processing
        // For now, we'll just simulate a response after a delay
        setTimeout(() => {
          setResult("Possible condition: Eczema (70% confidence)")
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <header className="bg-pink-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">Skin Disease Identifier</h1>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <nav className="hidden md:flex space-x-4">
              <NavItem href="/home.tsx">Home</NavItem>
              <NavItem href="/identify.tsx">Identify</NavItem>
              <NavItem href="/history.tsx">History</NavItem>
              <NavItem href="/about.tsx">About</NavItem>
              <NavItem href="/profile.tsx">Profile</NavItem>
            </nav>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-pink-500">
          <nav className="flex flex-col items-center py-2">
            <NavItem href="/home.tsx">Home</NavItem>
            <NavItem href="/identify.tsx">Identify</NavItem>
            <NavItem href="/history.tsx">History</NavItem>
            <NavItem href="/about.tsx">About</NavItem>
            <NavItem href="/profile.tsx">Profile</NavItem>
          </nav>
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto bg-white">
          <CardHeader className="bg-pink-100">
            <CardTitle className="text-pink-800">Upload an image for identification</CardTitle>
          </CardHeader>
          <CardContent className="bg-orange-50">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-pink-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-pink-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-pink-400" />
                    <p className="mb-2 text-sm text-pink-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-pink-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <Input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              </div>
              
              {image && (
                <Card className="bg-white">
                  <CardHeader className="bg-orange-100">
                    <CardTitle className="text-orange-800">Image Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video">
                      <img src={image} alt="Uploaded skin condition" className="rounded-lg object-cover w-full h-full" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {result && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="show-result" className="text-sm font-medium text-pink-700">
                      Show Result
                    </label>
                    <Switch
                      id="show-result"
                      checked={showResult}
                      onCheckedChange={setShowResult}
                    />
                  </div>

                  {showResult && (
                    <Card className="bg-white">
                      <CardHeader className="bg-orange-100">
                        <CardTitle className="text-orange-800">Identification Result</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="text-orange-500" />
                          <p className="text-orange-700">{result}</p>
                        </div>
                        <p className="mt-2 text-sm text-orange-600">Please consult with a healthcare professional for accurate diagnosis.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {result && (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    {showDescription ? (
                      <ChevronUp className="mr-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="mr-2 h-4 w-4" />
                    )}
                    {showDescription ? "Hide" : "Show"} Disease Description
                  </Button>

                  {showDescription && (
                    <Card className="bg-white">
                      <CardHeader className="bg-pink-100">
                        <CardTitle className="text-pink-800">About Eczema</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-pink-700">
                          Eczema, also known as atopic dermatitis, is a common skin condition characterized by red, itchy, and inflamed skin. It often appears as patches on the hands, feet, ankles, wrists, neck, upper chest, eyelids, and inside the bend of the elbows and knees.
                        </p>
                        <p className="mt-2 text-pink-700">
                          Symptoms can vary from person to person and may include:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-pink-700">
                          <li>Dry, sensitive skin</li>
                          <li>Intense itching</li>
                          <li>Red, inflamed skin</li>
                          <li>Recurring rash</li>
                          <li>Scaly patches</li>
                          <li>Oozing or crusting</li>
                        </ul>
                        <p className="mt-2 text-sm text-pink-600">
                          If you suspect you have eczema, it's important to consult with a dermatologist for proper diagnosis and treatment.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              <Link href="/start-identification.tsx" passHref>
                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white" disabled={!image}>
                  {result ? "Identify Another Image" : "Start Identification"}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-pink-600 shadow-sm mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-white">© 2023 Skin Disease Identifier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} passHref>
      <a className="text-white hover:bg-pink-700 px-3 py-2 rounded-md text-sm font-medium">
        {children}
      </a>
    </Link>
  )
}