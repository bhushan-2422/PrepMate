This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.





import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Formfield from "./Formfield";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const InterviewForm = () => {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      description:"",
      duration:"",
      type:""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log(values); // ✅ Validated values
  }
  return (
  <div>
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {!isSignIn && (
              <Formfield
                control={form.control}
                name="jobTitle"
                label="jobTitle"
                placeholder="e.g. fullstack developer"
                type="text"
              />
            )}
            <Formfield
              control={form.control}
              name="description"
              label="description"
              placeholder="Job description"
              type="text"
            />
            <Formfield
              control={form.control}
              name="duration"
              label="duration"
              type=""
            />

            <Button className="btn-primary" type="submit">
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>

            <div>
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                href={!isSignIn ? "/signin" : "/signup"}
                className="font-bold"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </form>
        </Form>

  </div>
)
};

export default InterviewForm;
