"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import { EventRegistrationModal } from "./event-registration-modal";
import { useRouter } from "next/navigation";
import {
  CalendarPlus,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  PhoneIcon,
  Users,
} from "lucide-react";

const registeredEvents = [
  {
    name: "Tech Conference 2024",
    description:
      "Annual technology conference featuring the latest in AI and machine learning.",
    poc: "Jane Doe",
    mobile: "+1 (555) 123-4567",
    teamMembers: [
      { name: "Alice Johnson", mobile: "+1 (555) 234-5678" },
      { name: "Bob Smith", mobile: "+1 (555) 345-6789" },
    ],
  },
  {
    name: "Startup Pitch Night",
    description:
      "An evening of innovative startup pitches and networking opportunities.",
    poc: "John Smith",
    mobile: "+1 (555) 987-6543",
    teamMembers: [{ name: "Carol White", mobile: "+1 (555) 456-7890" }],
  },
  {
    name: "Coding Workshop",
    description:
      "Hands-on workshop covering advanced JavaScript techniques and best practices.",
    poc: "Alice Johnson",
    mobile: "+1 (555) 246-8135",
    teamMembers: [],
  },
];

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const router = useRouter();

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const logoutUser = async () => {
    setLoading(true);
    const response = await fetch("/api/signout", { method: "POST" });
    if (response.status === 200) {
      router.push("/signin");
    }
    setLoading(false);
  };

  return (
    <div className="w-full bg-[#160430] min-h-screen">
      <Image
        src="/auth-space.png"
        alt="Auth Space"
        width="1655"
        height="1856"
        className="h-full w-full lg:w-6/12 object-cover absolute inset-0"
      />
      <div className="relative z-10 w-full h-full">
        <nav className="bg-primary/50 text-primary-foreground shadow-md  ">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <span className="text-2xl font-bold">Event Dashboard</span>
              <div className="hidden md:flex space-x-4">
                <Link href={"/dashboard"}>
                  <Button
                    variant="ghost"
                    className="hover:bg-primary-foreground hover:text-primary"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/events-2">
                  <Button
                    variant="ghost"
                    className="hover:bg-primary-foreground hover:text-primary"
                  >
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Register for Event
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="hover:bg-primary-foreground hover:text-primary"
                  onClick={logoutUser}
                >
                  {loading ? (
                    <LoaderCircle className="mr-2 w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  Logout
                </Button>
              </div>
              <Button
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-primary/50 text-primary-foreground">
            <div className="container mx-auto px-4 py-2">
              <Link href={"/dashboard"}>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-primary-foreground hover:text-primary"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/events-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-primary-foreground hover:text-primary"
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Register for Event
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-primary-foreground hover:text-primary"
                onClick={logoutUser}
              >
                {loading ? (
                  <LoaderCircle className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                Logout
              </Button>
            </div>
          </div>
        )}
        <main className="flex-grow container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-primary-foreground">
            My Registrations
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {registeredEvents.map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Point of Contact:</p>
                  <p>{event.poc}</p>
                  <div className="flex items-center mt-2">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    <p>{event.mobile}</p>
                  </div>
                  {event.teamMembers.length > 0 && (
                    <div className="mt-4">
                      <p className="font-semibold flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Team Members:
                      </p>
                      <ul className="list-disc list-inside">
                        {event.teamMembers.map((member, idx) => (
                          <li key={idx}>
                            {member.name} - {member.mobile}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <EventRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
      />
    </div>
  );
}
