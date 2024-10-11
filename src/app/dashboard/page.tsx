"use client";

import Image from "next/image";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { EventRegistrationModal } from "./event-registration-modal";
import { useRouter } from "next/navigation";

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

  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
  };

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
                <Button
                  variant="ghost"
                  className="hover:bg-primary-foreground hover:text-primary"
                  onClick={openRegistrationModal}
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Register for Event
                </Button>
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
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-primary-foreground hover:text-primary"
                onClick={openRegistrationModal}
              >
                <CalendarPlus className="mr-2 h-4 w-4" />
                Register for Event
              </Button>
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

function LayoutDashboard({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={`lucide lucide-layout-dashboard ${className}`}
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function CalendarPlus({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M3 10h18" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </svg>
  );
}

function LogOut({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function PhoneIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function Menu({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Users({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LoaderCircle({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
