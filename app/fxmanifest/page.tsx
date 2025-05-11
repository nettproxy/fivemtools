"use client"

import { useState } from "react"
import { Shield, Search, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [resourceName, setResourceName] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [version, setVersion] = useState("1.0.0")
  const [clientScripts, setClientScripts] = useState("")
  const [serverScripts, setServerScripts] = useState("")
  const [sharedScripts, setSharedScripts] = useState("")

  const generateManifest = () => {
    return `fx_version 'cerulean'
game 'gta5'

author '${author}'
description '${description}'
version '${version}'

name '${resourceName}'

client_scripts {
    ${clientScripts.split(',').map(script => `    'client/${script.trim()}.lua'`).join(',\n')}
}

server_scripts {
    ${serverScripts.split(',').map(script => `    'server/${script.trim()}.lua'`).join(',\n')}
}

shared_scripts {
    ${sharedScripts.split(',').map(script => `    'shared/${script.trim()}.lua'`).join(',\n')}
}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-background dark">
      <header className="border-b">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-pink-400 via-white via-blue-400 to-blue-500 bg-clip-text text-transparent">
              <Shield className="inline mr-2 mb-1 h-5 w-5 text-pink-500" /> fivemtools - FXManifest Generator
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <HoverCard>
              <HoverCardTrigger>
                <Button variant="outline" size="sm" className="h-9">
                  <Info className="h-4 w-4 mr-2" /> About
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">FiveM FXManifest Generator</h4>
                    <p className="text-sm">Generate FXManifest files for your FiveM resources.</p>
                    <div className="flex items-center pt-2">
                      <span className="text-xs text-muted-foreground">Last updated: May 2025</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto py-6 px-4">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>FXManifest Generator</CardTitle>
              <CardDescription>Generate your FXManifest file for your FiveM resource</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="resourceName">Resource Name</label>
                  <Input
                    id="resourceName"
                    placeholder="my_resource"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="author">Author</label>
                  <Input
                    id="author"
                    placeholder="Your Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <Input
                    id="description"
                    placeholder="A brief description of your resource"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="version">Version</label>
                  <Input
                    id="version"
                    placeholder="1.0.0"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="serverScripts">Server Scripts</label>
                  <Input
                    id="serverScripts"
                    placeholder="server.lua"
                    value={serverScripts}
                    onChange={(e) => setServerScripts(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="clientScripts">Client Scripts</label>
                  <Input
                    id="clientScripts"
                    placeholder="client.lua"
                    value={clientScripts}
                    onChange={(e) => setClientScripts(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="sharedScripts">Shared Scripts</label>
                  <Input
                    id="sharedScripts"
                    placeholder="shared.lua"
                    value={sharedScripts}
                    onChange={(e) => setSharedScripts(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Generated FXManifest</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {generateManifest()}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
