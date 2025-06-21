"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Divide } from "lucide-react";
import Formfield from "./Formfield";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; //if error caused check here
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

// Schema definition using zod

const authformschema = (type) => {
  return z.object({
    name: type == "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string(),
    password: z.string().min(3),
  });
};

const Auth = ({ type }) => {
  const router = useRouter();
  const formSchema = authformschema(type);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {
      if (type == "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        //this registers a new user in firebase authentication

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name,
          email: email,
          password: password,
        });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created succesfully! Please sign in");
        router.push("/signin");
      } else {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredentials.user.getIdToken();
        if (!idToken) {
          toast.error("sign In failed");
          return;
        }
        await signIn({
          email,
          idToken,
        });

        toast.success("Logged in succesfully!");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");

    }
  }

  const isSignIn = type == "sign-in";

  return (
    <div className="card-border">
      <div className="w-auto h-auto card flex flex-col item-center gap-6 py-14 px-10">
        <div className=" flex gap-2 items-center justify-center">
          {/* <Image src="/logo.svg" alt="Logo" width={56} height={42} /> */}
          <h2>
            <span className="text-green-400">&lt;</span>
            Prep<span className="text-green-400">Mate/&gt;</span>
          </h2>
        </div>
        <h3>practice your job interviews at one place</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {!isSignIn && (
              <Formfield
                control={form.control}
                name="name"
                label="name"
                placeholder="your name"
              />
            )}
            <Formfield
              control={form.control}
              name="email"
              label="email"
              placeholder="your email address"
              type="email"
            />
            <Formfield
              control={form.control}
              name="password"
              label="password"
              placeholder="your password"
              type="password"
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
    </div>
  );
};

export default Auth;
