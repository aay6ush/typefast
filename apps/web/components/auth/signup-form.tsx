import { useTransition } from "react";
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
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { signUpSchema, SignUpValues } from "@repo/common/schemas";
import { toast } from "sonner";
import { register } from "@/actions/register";

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

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSignUp = async (values: SignUpValues) => {
    startTransition(async () => {
      try {
        const result = await register(values);

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSignUp)}
        className="space-y-4 text-neutral-200"
      >
        <motion.div variants={childVariants}>
          <FormField
            control={signUpForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-200">Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-2 h-5 w-5 text-neutral-400" />
                    <Input
                      placeholder="John Doe"
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
            control={signUpForm.control}
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
            control={signUpForm.control}
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
              Sign Up <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
