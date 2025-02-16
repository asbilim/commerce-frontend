"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Target, Award, Heart, ShoppingBag, Truck } from "lucide-react";

function AboutPage() {
  const t = useTranslations("ui.about");

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stats = [
    { icon: Users, value: "10K+", label: t("stats.customers") },
    { icon: ShoppingBag, value: "50K+", label: t("stats.products") },
    { icon: Truck, value: "99%", label: t("stats.delivery") },
  ];

  const values = [
    {
      icon: Heart,
      title: t("values.quality.title"),
      description: t("values.quality.description"),
    },
    {
      icon: Target,
      title: t("values.innovation.title"),
      description: t("values.innovation.description"),
    },
    {
      icon: Award,
      title: t("values.satisfaction.title"),
      description: t("values.satisfaction.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <motion.div
          className="container px-4 md:px-6"
          initial="initial"
          animate="animate"
          variants={fadeInUp}>
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              {t("hero.description")}
            </p>
          </div>
        </motion.div>
      </section>

      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Our Story */}
          <Card>
            <CardHeader>
              <CardTitle>{t("story.title")}</CardTitle>
              <CardDescription>{t("story.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t("story.content.part1")}
              </p>
              <p className="text-muted-foreground">
                {t("story.content.part2")}
              </p>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>{t("stats.title")}</CardTitle>
              <CardDescription>{t("stats.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.2 }}>
                    <stat.icon className="h-8 w-8 text-primary" />
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Our Values */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("values.title")}</CardTitle>
              <CardDescription>{t("values.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center space-y-4 text-center p-4"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.2 }}>
                    <value.icon className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default AboutPage;
