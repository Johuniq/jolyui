import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AuthForm } from "./auth-form";
import { SocialLogin } from "./social-login";

export default function AuthBasic() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-white dark:bg-black">
            <div className="w-full max-w-[450px]">
                <div className="w-full h-48 relative mb-4">
                    <Image
                        src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/to-the-moon-u5UJD9sRK8WkmaTY8HdEsNKjAQ9bjN.svg"
                        alt="To the moon illustration"
                        fill
                        className="object-cover"
                    />
                </div>
                <Card className="w-full border-0 shadow-lg">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-semibold tracking-tight text-black dark:text-white">
                            Welcome back
                        </CardTitle>
                        <CardDescription className="text-neutral-600 dark:text-neutral-400">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <AuthForm />
                        <SocialLogin />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
