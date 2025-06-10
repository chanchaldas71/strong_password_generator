import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";

const generatePassword = (length, includeUppercase, includeNumbers, includeSymbols) => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let characters = lowercaseChars;
  if (includeUppercase) characters += uppercaseChars;
  if (includeNumbers) characters += numberChars;
  if (includeSymbols) characters += symbolChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newPassword = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-6">
        <CardContent className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Strong Password Generator</h1>

          <div className="space-y-2">
            <Label htmlFor="length">Password Length: {length}</Label>
            <Input
              id="length"
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">Include Uppercase</Label>
            <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="numbers">Include Numbers</Label>
            <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="symbols">Include Symbols</Label>
            <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
          </div>

          <Button className="w-full" onClick={handleGenerate}>Generate Password</Button>

          {password && (
            <div className="bg-gray-200 rounded-md p-2 font-mono text-center relative">
              {password}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
              {copied && <p className="text-sm text-green-600 mt-2">Copied!</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
