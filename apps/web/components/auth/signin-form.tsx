import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { signInSchema, SignInValues } from "@repo/common/schemas";
import { useTransition } from "react";
import { login } from "@/actions/login";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants";

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();

  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (values: SignInValues) => {
    startTransition(async () => {
      try {
        const result = await login(values);

        if (result.success) {
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          });

          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Sign in error:", error);
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(onSignIn)}
        className="space-y-4 text-neutral-200"
      >
        <motion.div variants={childVariants}>
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-200">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
                      placeholder="john@gmail.com"
                      {...field}
                      className="pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        <motion.div variants={childVariants}>
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-200">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
                      type="password"
                      placeholder="●●●●●●●●"
                      {...field}
                      className="pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <motion.div
              className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ) : (
            <>
              Sign In <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
