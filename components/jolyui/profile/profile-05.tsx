import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Plus,
  Settings2,
  Shield,
  Users,
} from "lucide-react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  email: string;
  avatar: string;
  availability: "available" | "busy" | "offline";
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
  };
}

interface Profile05Props {
  teamName?: string;
  description?: string;
  members?: TeamMember[];
}

const defaultProfile = {
  teamName: "Product Design",
  description:
    "Core product design team responsible for user experience and interface design",
  members: [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Lead Designer",
      location: "San Francisco, CA",
      email: "sarah@example.com",
      avatar:
        "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
      availability: "available",
      skills: ["UI Design", "Design Systems", "User Research"],
      social: {
        github: "sarahchen",
        linkedin: "sarahchen",
      },
    },
    {
      id: "2",
      name: "Mike Wilson",
      role: "Senior Designer",
      location: "London, UK",
      email: "mike@example.com",
      avatar:
        "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
      availability: "busy",
      skills: ["Product Design", "Prototyping", "Animation"],
      social: {
        github: "mikewilson",
        linkedin: "mikewilson",
      },
    },
  ],
} satisfies Required<Profile05Props>;

export default function Profile05({
  teamName = defaultProfile.teamName,
  description = defaultProfile.description,
  members = defaultProfile.members,
}: Profile05Props = defaultProfile) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={cn(
          "overflow-hidden",
          "bg-white dark:bg-zinc-900",
          "rounded-2xl",
          "border border-zinc-200 dark:border-zinc-800",
          "transition-all duration-200"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div
                className={cn("p-3 rounded-xl", "bg-zinc-100 dark:bg-zinc-800")}
              >
                <Users className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {teamName}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings2 className="w-4 h-4" />
                Settings
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {members.map((member) => (
            <div
              key={member.id}
              className={cn(
                "p-6",
                "transition-colors duration-200",
                "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              )}
            >
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={56}
                    height={56}
                    className="rounded-xl"
                  />
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1",
                      "w-3.5 h-3.5 rounded-full",
                      "ring-2 ring-white dark:ring-zinc-900",
                      member.availability === "available" && "bg-emerald-500",
                      member.availability === "busy" && "bg-amber-500",
                      member.availability === "offline" &&
                        "bg-zinc-300 dark:bg-zinc-600"
                    )}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {member.social.github && (
                        <a
                          href="https://github.com/kokonut-labs/jolyui"
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href="#"
                          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4" />
                      {member.role}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {member.location}
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
