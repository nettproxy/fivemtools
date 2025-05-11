"use client"

import { useState } from "react"
import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  Info,
  ExternalLink,
  Star,
  Filter,
  ArrowUpDown,
  Tag,
  Terminal,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const anticheats = [
  {
    id: 1,
    name: "PhantomGuard",
    description: "Advanced anticheat solution with a wide range of features",
    price: "25€/month",
    website: "",
    status: "Premium",
    thingy2: "Recommended",
    thingy3: "Reliable",
    detectionRate: 95,
    falsePositives: "Very Low",
    category: "Premium",
    tags: ["lua executor protection", "resource protection", "entity protection", "anti-cheat"],
  },
  {
    id: 2,
    name: "WaveShield",
    description: "WaveShield is a paid anticheat solution for FiveM servers.",
    price: "50€/month",
    website: "https://waveshield.xyz",
    status: "Premium",
    thingy2: "Recommended",
    thingy3: "Reliable",
    detectionRate: 98,
    falsePositives: "Very Low",
    category: "Premium",
    tags: ["lua executor protection", "resource protection", "entity protection"],
  },
  {
    id: 3,
    name: "FiveGuard",
    description: "FiveGuard is a paid anticheat solution for FiveM servers.",
    price: "45€/month",
    website: "https://fiveguard.net",
    status: "Premium",
    thingy2: "Reliable",
    detectionRate: 84,
    falsePositives: "Medium",
    category: "Enterprise",
    tags: ["lua executor protection", "resource protection", "entity protection"],
  },
  {
    id: 7,
    name: "ChocoHax",
    description: "ChocoHax is a paid anticheat solution for FiveM servers.",
    price: "25€/month",
    website: "https://lynxcollective.ltd/",
    status: "Shitty",
    thingy2: "Basic",
    detectionRate: 60,
    falsePositives: "High",
    category: "Premium",
    tags: ["lua executor protection", "resource protection", "shitty protection"],
  },
  {
    id: 10,
    name: "CyberGuard",
    description: "CyberGuard is a paid anticheat solution for FiveM servers. (not released yet)",
    price: "Free",
    website: "",
    status: "Shitty",
    thingy2: "Basic",
    detectionRate: 35,
    falsePositives: "High",
    category: "Premium",
    tags: ["shitty"],
  },
  {
    id: 4,
    name: "Sentic AntiCheat",
    description: "Sentic AntiCheat is a paid anticheat solution for FiveM servers.",
    price: "5€/month",
    website: "https://sentic-anticheat.com",
    status: "Premium",
    thingy2: "Reliable",
    detectionRate: 83,
    falsePositives: "Medium",
    category: "Premium",
    tags: ["lua executor protection", "resource protection", "entity protection"],
  },
  {
    id: 5,
    name: "Viper AntiCheat",
    description: "Viper AntiCheat is a free anticheat solution for FiveM servers.",
    price: "Free",
    website: "https://discord.gg/viperac",
    status: "Free",
    thingy2: "Basic",
    detectionRate: 65,
    falsePositives: "Medium",
    category: "Free",
    tags: ["lua executor protection", "resource protection", "entity protection"],
  },
  {
    id: 9,
    name: "FireAC",
    description: "FireAC is a free anticheat solution for FiveM servers.",
    price: "Free",
    website: "https://github.com/AmirrezaJaberi/FIREAC",
    status: "Free",
    thingy2: "Basic",
    detectionRate: 75,
    falsePositives: "Medium",
    category: "Free",
    tags: ["lua executor protection", "resource protection", "entity protection"],
  },
  {
    id: 10,
    name: "ElectronAC",
    description: "ElectronAC is a paid anticheat solution for FiveM servers.",
    price: "35€/month",
    website: "https://electron-services.com",
    status: "Premium",
    thingy2: "Reliable",
    detectionRate: 86,
    falsePositives: "Low",
    category: "Premium",
    tags: ["lua executor protection", "resource protection", "entity protection"],
  }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recommended")

  const filteredAnticheats = anticheats.filter((ac) => {
    const matchesSearch =
      ac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ac.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ac.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || ac.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const sortedAnticheats = [...filteredAnticheats].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price":
        return a.price === "Free"
          ? -1
          : b.price === "Free"
            ? 1
            : Number.parseInt(a.price.replace(/\D/g, "")) - Number.parseInt(b.price.replace(/\D/g, ""))
      case "detection":
        return b.detectionRate - a.detectionRate
      case "recommended":
      default:
        const statusOrder = { Recommended: 1, Premium: 2, Reliable: 3, Good: 4, Basic: 5, Shitty: 6, Paid: 7 }
        return (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99)
    }
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "Recommended":
        return "bg-green-500/10 text-green-500 dark:text-green-300 border-green-500/30"
      case "Premium":
        return "bg-purple-500/10 text-purple-500 dark:text-purple-300 border-purple-500/30"
      case "Shitty":
        return "bg-red-500/10 text-red-500 dark:text-red-300 border-red-500/30"
      case "Paid":
        return "bg-blue-500/10 text-blue-500 dark:text-blue-300 border-blue-500/30"
      case "Reliable":
        return "bg-blue-500/10 text-blue-500 dark:text-blue-300 border-blue-500/30"
      case "Good":
        return "bg-yellow-500/10 text-yellow-500 dark:text-yellow-300 border-yellow-500/30"
      case "Basic":
        return "bg-amber-700/10 text-amber-700 dark:text-amber-500 border-amber-700/30"
      default:
        return "bg-gray-500/10 text-gray-500 dark:text-gray-300 border-gray-500/30"
    }
  }

  const getThingy2Badge = (thingy2) => {
    switch (thingy2) {
      case "Recommended":
        return "bg-green-500/10 text-green-500 dark:text-green-300 border-green-500/30"
      case "Free":
        return "bg-gray-500/10 text-gray-500 dark:text-gray-300 border-gray-500/30"
      case "Reliable":
        return "bg-blue-500/10 text-blue-500 dark:text-blue-300 border-blue-500/30"
      case "Basic":
        return "bg-amber-700/10 text-amber-700 dark:text-amber-500 border-amber-700/30"
      default:
        return "bg-gray-500/10 text-gray-500 dark:text-gray-300 border-gray-500/30"
    }
  }

  const getDetectionBadge = (rate) => {
    if (rate >= 95) return "bg-green-500/10 text-green-500 dark:text-green-300 border-green-500/30"
    if (rate >= 85) return "bg-blue-500/10 text-blue-500 dark:text-blue-300 border-blue-500/30"
    if (rate >= 75) return "bg-yellow-500/10 text-yellow-500 dark:text-yellow-300 border-yellow-500/30"
    return "bg-red-500/10 text-red-500 dark:text-red-300 border-red-500/30"
  }

  const getFalseBadge = (level) => {
    switch (level) {
      case "Very Low":
        return "bg-green-500/10 text-green-500 dark:text-green-300 border-green-500/30"
      case "Low":
        return "bg-blue-500/10 text-blue-500 dark:text-blue-300 border-blue-500/30"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 dark:text-yellow-300 border-yellow-500/30"
      case "High":
      default:
        return "bg-red-500/10 text-red-500 dark:text-red-300 border-red-500/30"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background dark">
      <header className="border-b">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-pink-400 via-white via-blue-400 to-blue-500 bg-clip-text text-transparent">
              <Shield className="inline mr-2 mb-1 h-5 w-5 text-pink-500" /> fivemtools - AntiCheat List
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
                    <h4 className="text-sm font-semibold">FiveM Anticheat Comparison</h4>
                    <p className="text-sm">Compare different anticheat solutions for your FiveM server.</p>
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
        <div className="flex flex-col gap-4 mb-6">
        <Alert className="">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              We do not own or affiliated with the anticheats listed below. We are not responsible for any issues that may occur from using these anticheats.
            </AlertDescription>
          </Alert>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search anticheats by name, description or tags..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-12">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="detection">Detection Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full mb-6">
          <TabsList className="h-10 w-[200px] grid grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAnticheats.map((anticheat) => (
                <Card
                  key={anticheat.id}
                  className="bg-gradient-to-br from-pink-500/5 via-pink-400/5 via-white/5 via-blue-400/5 to-blue-500/5 border border-pink-500/10 shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-xl font-bold">{anticheat.name}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={`px-2 py-0.5 text-xs ${getStatusBadge(anticheat.status)}`}>
                          {anticheat.status}
                        </Badge>
                        <Badge variant="outline" className={`px-2 py-0.5 text-xs ${getThingy2Badge(anticheat.thingy2)}`}>
                          {anticheat.thingy2}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base mt-1">{anticheat.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="font-semibold">{anticheat.price}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Detection Rate:</span>
                        <Badge variant="outline" className={`px-3 py-1 ${getDetectionBadge(anticheat.detectionRate)}`}>
                          {anticheat.detectionRate}%
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">False Positives:</span>
                        <Badge variant="outline" className={`px-3 py-1 ${getFalseBadge(anticheat.falsePositives)}`}>
                          {anticheat.falsePositives}
                        </Badge>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-2">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {anticheat.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-[#f4a4cc]/10 text-[#f4a4cc] dark:text-[#f4a4cc] border-[#f4a4cc]/30 px-2 py-0"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white"
                      onClick={() => window.open(anticheat.website, "_blank")}
                    >
                      Visit Website
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Detection</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">False Positives</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {sortedAnticheats.map((anticheat) => (
                        <tr
                          key={anticheat.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">
                            <div className="font-medium">{anticheat.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {anticheat.description.substring(0, 50)}...
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline" className={`px-2 py-0.5 ${getStatusBadge(anticheat.status)}`}>
                              {anticheat.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">{anticheat.price}</td>
                          <td className="p-4 align-middle">
                            <Badge
                              variant="outline"
                              className={`px-2 py-0.5 ${getDetectionBadge(anticheat.detectionRate)}`}
                            >
                              {anticheat.detectionRate}%
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              variant="outline"
                              className={`px-2 py-0.5 ${getFalseBadge(anticheat.falsePositives)}`}
                            >
                              {anticheat.falsePositives}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(anticheat.website, "_blank")}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" /> Visit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </div>

      <footer className="mt-auto border-t py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2025 fivemtools. Not affiliated with FiveM or Cfx.re.
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button onClick={() => window.open("https://github.com/phantomguardanticheat", "_blank")} variant="ghost" size="sm">
                GitHub
              </Button>
              <Button onClick={() => window.open("https://discord.gg/phantomguard", "_blank")} variant="ghost" size="sm">
                Discord
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
