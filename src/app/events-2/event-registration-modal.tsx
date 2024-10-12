import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, MapPin, User, Phone } from "lucide-react"

interface EventRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event
}

type Event = {
  id: string;
  name: string;
  description: string;
  datetime: string;
  venue: string;
  poc: string;
  mobile: string;
}

export function EventRegistrationModal({ isOpen, onClose, event }: EventRegistrationModalProps) {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    name: "",
    teamMember1: { name: "", mobile: "" },
    teamMember2: { name: "", mobile: "" },
    teamMember3: { name: "", mobile: "" },
  })
  const [errors, setErrors] = useState({
    name: "",
    teamMember1: { name: "", mobile: "" },
    teamMember2: { name: "", mobile: "" },
    teamMember3: { name: "", mobile: "" },
  })

  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleTeamMemberInputChange = (memberNumber: number, field: "name" | "mobile", value: string) => {
   setUserData((prev) => ({
      ...prev,
      [`teamMember${memberNumber}`]: {
        ...(prev[`teamMember${memberNumber}` as keyof typeof prev] as { name: string; mobile: string }),
        [field]: value,
      },
    }))
    setErrors((prev) => ({
      ...prev,
      [`teamMember${memberNumber}`]: {
        ...(prev[`teamMember${memberNumber}` as keyof typeof prev] as { name: string; mobile: string }),
        [field]: "",
      },
    }))
  }

const validateInputs = () => {
    let isValid = true
    const newErrors = {
      name: "",
      teamMember1: { name: "", mobile: "" },
      teamMember2: { name: "", mobile: "" },
      teamMember3: { name: "", mobile: "" },
    }

    if (!userData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    for (let i = 1; i <= 3; i++) {
      const member = userData[`teamMember${i}` as keyof typeof userData] as { name: string; mobile: string }
      if (member.name && !member.mobile) {
        (newErrors[`teamMember${i}` as keyof typeof newErrors] as { name: string; mobile: string }).mobile = "Mobile number is required if name is provided"
        isValid = false
      }
      if (member.mobile && !member.name) {
        (newErrors[`teamMember${i}` as keyof typeof newErrors] as { name: string; mobile: string }).name = "Name is required if mobile number is provided"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

const handleNext = () => {
    if (step === 1 || validateInputs()) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

const handleSubmit = () => {
    if (validateInputs()) {
      console.log("Submitting registration:", { event, userData })
      onClose()
      setStep(1)
      setUserData({
        name: "",
        teamMember1: { name: "", mobile: "" },
        teamMember2: { name: "", mobile: "" },
        teamMember3: { name: "", mobile: "" },
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Event Registration - Step {step}</DialogTitle>
        </DialogHeader>
        <div className="min-h-[400px]">
          {step === 1 && (
             <div className="space-y-4">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <div className="grid grid-cols-[20px_1fr] gap-2 items-center">
                <Calendar className="w-5 h-5" />
                <p>{new Date(event.datetime).toLocaleDateString()}</p>
                <Clock className="w-5 h-5" />
                <p>{new Date(event.datetime).toLocaleTimeString()}</p>
                <MapPin className="w-5 h-5" />
                <p>{event.venue}</p>
                <User className="w-5 h-5" />
                <p>{event.poc}</p>
                <Phone className="w-5 h-5" />
                <p>{event.mobile}</p>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={userData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              {[1, 2, 3].map((memberNumber) => (
                <div key={memberNumber} className="space-y-2">
                  <Label>Team Member {memberNumber}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input
                        placeholder="Name"
                        value={((userData[`teamMember${memberNumber}` as keyof typeof userData] as { name: string; mobile: string } | undefined)?.name) || ''}
                        onChange={(e) => handleTeamMemberInputChange(memberNumber, "name", e.target.value)}
                        className={((errors[`teamMember${memberNumber}` as keyof typeof errors] as { name?: string } | undefined)?.name) ? "border-red-500" : ""}
                      />
                      {((errors[`teamMember${memberNumber}` as keyof typeof errors] as { name?: string } | undefined)?.name) && (
                        <p className="text-sm text-red-500">{(errors[`teamMember${memberNumber}` as keyof typeof errors] as { name?: string } | undefined)?.name}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        placeholder="Mobile"
                        value={(userData[`teamMember${memberNumber}` as keyof typeof userData] as { mobile: string }).mobile}
                        onChange={(e) => handleTeamMemberInputChange(memberNumber, "mobile", e.target.value)}
                        className={((errors[`teamMember${memberNumber}` as keyof typeof errors] as { mobile?: string } | undefined)?.mobile) ? "border-red-500" : ""}
                      />
                      {((errors[`teamMember${memberNumber}` as keyof typeof errors] as { mobile?: string } | undefined)?.mobile) && (
                        <p className="text-sm text-red-500">{(errors[`teamMember${memberNumber}` as keyof typeof errors] as { mobile?: string } | undefined)?.mobile}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold">Registration Summary</h3>
              <p><strong>Event:</strong> {event.name}</p>
              <p><strong>Your Name:</strong> {userData.name}</p>
              {[1, 2, 3].map((memberNumber) => {
                const member = userData[`teamMember${memberNumber}` as keyof typeof userData] as { name: string; mobile: string }
                if (member.name || member.mobile) {
                  return (
                    <p key={memberNumber}>
                      <strong>Team Member {memberNumber}:</strong> {member.name} ({member.mobile})
                    </p>
                  )
                }
                return null
              })}
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col items-center">
          <div className="flex justify-between w-full mt-4">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < 3 && (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
            {step === 3 && <Button type="button" onClick={handleSubmit}>Submit</Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}