
import * as z from "zod";

// Validation schema for parent information
export const parentSchema = z.object({
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  parentEmail: z.string().email("Please enter a valid email address"),
  consentGiven: z.boolean().refine(val => val === true, {
    message: "You must agree to receive the verification email"
  })
});

// Validation schema for verification code
export const verificationSchema = z.object({
  code: z.string().min(4, "Verification code must be at least 4 characters")
});

export type ParentFormValues = z.infer<typeof parentSchema>;
export type VerificationFormValues = z.infer<typeof verificationSchema>;
