"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  CalendarPlus,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  Search,
} from "lucide-react";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EventRegistrationModal } from "./event-registration-modal";
import Link from "next/link";

// Updated fake event data
const events = [
  {
    id: "1",
    name: "Tech Conference 2024",
    description:
      "Annual technology conference featuring the latest in AI and machine learning.",
    datetime: "2024-06-15T09:00:00",
    venue: "Moscone Center, San Francisco, CA",
    poc: "Jane Doe",
    mobile: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Startup Pitch Night",
    description:
      "An evening of innovative startup pitches and networking opportunities.",
    datetime: "2024-07-22T18:30:00",
    venue: "TechHub, New York, NY",
    poc: "John Smith",
    mobile: "+1 (555) 987-6543",
  },
  {
    id: "3",
    name: "Coding Workshop",
    description:
      "Hands-on workshop covering advanced JavaScript techniques and best practices.",
    datetime: "2024-08-10T10:00:00",
    venue: "Code Academy, Chicago, IL",
    poc: "Alice Johnson",
    mobile: "+1 (555) 246-8135",
  },
  {
    id: "4",
    name: "Data Science Symposium",
    description:
      "Exploring the latest trends and techniques in data science and analytics.",
    datetime: "2024-09-05T09:30:00",
    venue: "Boston Convention Center, Boston, MA",
    poc: "David Lee",
    mobile: "+1 (555) 369-2580",
  },
  {
    id: "5",
    name: "UX/UI Design Masterclass",
    description:
      "Learn from industry experts about creating intuitive and engaging user experiences.",
    datetime: "2024-10-18T11:00:00",
    venue: "Design Hub, Seattle, WA",
    poc: "Emily Chen",
    mobile: "+1 (555) 147-2589",
  },
];
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventListing />
    </Suspense>
  );
}
function EventListing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0]>(
    events[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const eventId = searchParams.get("event") as string;
    const query = searchParams.get("search") as string;
    if (eventId) {
      const event = events.find((e) => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
        setIsModalOpen(true);
      }
    }
    if (query) {
      setSearchQuery(query);
      filterEvents(query);
    }
  }, [searchParams]);

  const filterEvents = (query: string) => {
    const filtered = events.filter(
      (event) =>
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.venue.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      router.push(`/events-2?search=${encodeURIComponent(query)}`);
      filterEvents(query);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const openModal = (event: (typeof events)[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    router.push(
      `/events-2?event=${event.id}${
        searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""
      }`
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(events[0]);
    router.push(
      `/events-2${
        searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""
      }`
    );
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
    <div className="w-full bg-[#160430] min-h-screen bg-cover bg-fixed" style={{ backgroundImage: "url('/auth-space.png')" }}>
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold mb-6 text-primary-foreground">
              Events
            </h1>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-8 pr-4 py-2 w-64"
              />
            </div>
          </div>
          <div className="space-y-6">
            {filteredEvents.length === 0 ? (
              <p className="text-center text-gray-200 text-lg bg-primary/50 p-4 rounded-md">
                No events found
              </p>
            ) : (
              filteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Date and Time:</strong>{" "}
                      {new Date(event.datetime).toLocaleString("en-GB")}
                    </p>
                    <p>
                      <strong>Venue:</strong> {event.venue}
                    </p>
                    <p>
                      <strong>Point of Contact:</strong> {event.poc}
                    </p>
                    <p>
                      <strong>Contact Number:</strong> {event.mobile}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => openModal(event)}>Register</Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
      <EventRegistrationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEvent}
      />
    </div>
  );
}
