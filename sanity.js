import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "r0p0271y",
  dataset: "dataset-sanity",
  useCdn: true,
  apiVersion: "2024-03-25",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
export default client;
