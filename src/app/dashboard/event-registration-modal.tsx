import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { StepIndicator } from "./step-indicator"

const availableEvents = [
  {
    id: "1",
    name: "Tech Conference 2024",
    description: "Annual technology conference featuring the latest in AI and machine learning.",
    poc: "Jane Doe",
    mobile: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Startup Pitch Night",
    description: "An evening of innovative startup pitches and networking opportunities.",
    poc: "John Smith",
    mobile: "+1 (555) 987-6543",
  },
  {
    id: "3",
    name: "Coding Workshop",
    description: "Hands-on workshop covering advanced JavaScript techniques and best practices.",
    poc: "Alice Johnson",
    mobile: "+1 (555) 246-8135",
  },
  {
    id: "4",
    name: "Data Science Symposium",
    description: "Exploring the latest trends and techniques in data science and analytics.",
    poc: "David Lee",
    mobile: "+1 (555) 369-2580",
  },
  {
    id: "5",
    name: "UX/UI Design Masterclass",
    description: "Learn from industry experts about creating intuitive and engaging user experiences.",
    poc: "Emily Chen",
    mobile: "+1 (555) 147-2589",
  },
  {
    id: "6",
    name: "Blockchain Technology Summit",
    description: "Dive deep into the world of blockchain and its applications beyond cryptocurrency.",
    poc: "Michael Wong",
    mobile: "+1 (555) 753-9514",
  },
  {
    id: "7",
    name: "Cybersecurity Conference",
    description: "Stay ahead of the curve in protecting digital assets and infrastructure.",
    poc: "Sarah Martinez",
    mobile: "+1 (555) 951-7532",
  },
  {
    id: "8",
    name: "IoT Innovations Expo",
    description: "Showcase of the latest Internet of Things devices and technologies.",
    poc: "Robert Taylor",
    mobile: "+1 (555) 357-1598",
  },
]

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EventRegistrationModal({ isOpen, onClose }: EventRegistrationModalProps) {
  const [step, setStep] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [userData, setUserData] = useState({
    name: "",
    teamMember1: { name: "", mobile: "" },
    teamMember2: { name: "", mobile: "" },
    teamMember3: { name: "", mobile: "" },
  })

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId === selectedEvent ? null : eventId)
  }

  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTeamMemberInputChange = (memberNumber: number, field: "name" | "mobile", value: string) => {
    setUserData((prev) => ({
      ...prev,
      [`teamMember${memberNumber}`]: {
        ...(prev[`teamMember${memberNumber}` as keyof typeof prev] as { name: string; mobile: string }),
        [field]: value,
      },
    }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    // Here you would typically send the registration data to your backend
    console.log("Submitting registration:", { selectedEvent, userData })
    onClose()
    setStep(1)
    setSelectedEvent(null)
    setUserData({
      name: "",
      teamMember1: { name: "", mobile: "" },
      teamMember2: { name: "", mobile: "" },
      teamMember3: { name: "", mobile: "" },
    })
  }

  const selectedEventDetails = availableEvents.find((event) => event.id === selectedEvent)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Event Registration - Step {step}</DialogTitle>
        </DialogHeader>
        <div className="min-h-[400px]">
          {step === 1 && (
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {availableEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id={`event-${event.id}`}
                    checked={selectedEvent === event.id}
                    onCheckedChange={() => handleEventSelect(event.id)}
                  />
                  <div>
                    <Label
                      htmlFor={`event-${event.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {event.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
          {step === 2 && selectedEventDetails && (
            <div className="grid gap-4 py-4">
              <div>
                <h3 className="font-bold">{selectedEventDetails.name}</h3>
                <p className="text-sm text-gray-500">{selectedEventDetails.description}</p>
                <p className="text-sm">
                  POC: {selectedEventDetails.poc} ({selectedEventDetails.mobile})
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Your Name
                </Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="col-span-3"
                />
              </div>
              {[1, 2, 3].map((memberNumber) => (
                <div key={memberNumber} className="grid gap-2">
                  <Label className="text-sm font-semibold">Team Member {memberNumber}</Label>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`member${memberNumber}Name`} className="text-right">
                      Name
                    </Label>
                    <Input
                      id={`member${memberNumber}Name`}
                      value={(userData[`teamMember${memberNumber}` as keyof typeof userData] as { name: string; mobile: string })?.name || ''}
                      onChange={(e) => handleTeamMemberInputChange(memberNumber, "name", e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`member${memberNumber}Mobile`} className="text-right">
                      Mobile
                    </Label>
                    <Input
                      id={`member${memberNumber}Mobile`}
                      value={(userData[`teamMember${memberNumber}` as keyof typeof userData] as { name: string; mobile: string })?.mobile || ''}
                      onChange={(e) => handleTeamMemberInputChange(memberNumber, "mobile", e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {step === 3 && selectedEventDetails && (
            <div className="grid gap-4 py-4">
              <h3 className="font-bold">Registration Summary</h3>
              <p>
                <strong>Event:</strong> {selectedEventDetails.name}
              </p>
              <p>
                <strong>Your Name:</strong> {userData.name}
              </p>
              {[1, 2, 3].map((memberNumber) => {
                const member = userData[`teamMember${memberNumber}` as keyof typeof userData]
                if (member && (member as { name: string; mobile: string }).name && (member as { name: string; mobile: string }).mobile) {
                  return (
                    <p key={memberNumber}>
                      <strong>Team Member {memberNumber}:</strong> {(member as { name: string; mobile: string }).name} ({(member as { name: string; mobile: string }).mobile})
                    </p>
                  )
                }
                return null
              })}
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col items-center">
          <div className="flex justify-between w-full items-center">
            <div className="flex-1">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
            </div>
            <div className="flex-1 flex justify-center">
              <StepIndicator currentStep={step} totalSteps={3} />
            </div>
            <div className="flex-1 flex justify-end">
              {step < 3 && (
                <Button type="button" onClick={handleNext} disabled={step === 1 && !selectedEvent}>
                  Next
                </Button>
              )}
              {step === 3 && <Button type="button" onClick={handleSubmit}>Submit</Button>}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}