import { z } from "zod";

export const projectSchema = z.object({
  projects: z.array(
    z.object({
      name: z.string().describe("Name of a side project idea."),
      description: z
        .string()
        .describe(
          "Description of the project. It should be a short description of the project."
        ),
      technologies: z
        .array(z.string())
        .describe("Technologies used in the project."),
    })
  ),
});

export type Projects = z.infer<typeof projectSchema>;
