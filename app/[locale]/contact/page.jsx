"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function ContactPage() {
  const t = useTranslations("ui.contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Form validation schema using Zod
  const formSchema = z.object({
    name: z.string().min(1, t("validation.name_required")),
    email: z.string().email(t("validation.email_invalid")),
    subject: z.string().min(1, t("validation.subject_required")),
    message: z
      .string()
      .min(10, t("validation.message_min"))
      .max(1000, t("validation.message_max")),
  });

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to submit the form
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  // Animation variants for success/error messages
  const statusAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t("form.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.name")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("form.placeholders.name")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.email")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("form.placeholders.email")}
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.subject")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("form.placeholders.subject")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("form.placeholders.message")}
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}>
                    {isSubmitting ? t("form.submitting") : t("form.submit")}
                  </Button>
                </form>
              </Form>

              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    variants={statusAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
                      submitStatus === "success"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}>
                    {submitStatus === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span>
                      {submitStatus === "success"
                        ? t("form.success")
                        : t("form.error")}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("contact_info.title")}</CardTitle>
                <CardDescription>{t("contact_info.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 mt-1" />
                  <div>
                    <h4 className="font-medium">
                      {t("contact_info.address.title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("contact_info.address.line1")}
                      <br />
                      {t("contact_info.address.line2")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 mt-1" />
                  <div>
                    <h4 className="font-medium">
                      {t("contact_info.phone.title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("contact_info.phone.sales")}
                      <br />
                      {t("contact_info.phone.support")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 mt-1" />
                  <div>
                    <h4 className="font-medium">
                      {t("contact_info.email.title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("contact_info.email.sales")}
                      <br />
                      {t("contact_info.email.support")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 mt-1" />
                  <div>
                    <h4 className="font-medium">
                      {t("contact_info.hours.title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("contact_info.hours.weekdays")}
                      <br />
                      {t("contact_info.hours.weekend")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>{t("faq.title")}</CardTitle>
                <CardDescription>{t("faq.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="shipping">
                    <AccordionTrigger>
                      {t("faq.questions.shipping.question")}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t("faq.questions.shipping.answer")}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="returns">
                    <AccordionTrigger>
                      {t("faq.questions.returns.question")}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t("faq.questions.returns.answer")}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tracking">
                    <AccordionTrigger>
                      {t("faq.questions.tracking.question")}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t("faq.questions.tracking.answer")}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
