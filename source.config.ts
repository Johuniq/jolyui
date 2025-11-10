import {
    defineCollections,
    frontmatterSchema,
    metaSchema,
} from "fumadocs-mdx/config";

export const docs = defineCollections({
    type: "doc",
    dir: "content/docs",
    schema: frontmatterSchema, // zod schema to validate frontmatter
});

export const meta = defineCollections({
    type: "meta",
    dir: "content/docs",
    schema: metaSchema, // zod schema to validate JSON data
});
