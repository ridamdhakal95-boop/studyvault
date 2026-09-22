import { z } from "zod";

export const chapterSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().max(500).optional().nullable(),
  order: z.coerce.number().int().min(0).max(100000).default(0),
  published: z.boolean().default(true),
});

export const contentSchema = z.object({
  title: z.string().trim().min(2).max(180),
  type: z.enum(["QUESTION", "NUMERICAL", "SHORT", "LONG", "GIVE_REASON", "FORMULA", "NOTE"]),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  difficulty: z.string().trim().min(1).max(30).default("Medium"),
  tags: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  body: z.string().trim().max(20000).optional().nullable(),
  given: z.string().trim().max(10000).optional().nullable(),
  required: z.string().trim().max(5000).optional().nullable(),
  formula: z.string().trim().max(5000).optional().nullable(),
  solution: z.string().trim().max(20000).optional().nullable(),
  finalAnswer: z.string().trim().max(5000).optional().nullable(),
  units: z.string().trim().max(1000).optional().nullable(),
  variables: z.string().trim().max(5000).optional().nullable(),
  chapterId: z.string().min(1),
  priority: z.coerce.number().int().min(0).max(100000).default(0),
});
