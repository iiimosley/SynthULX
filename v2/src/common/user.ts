import type { IdentifiedPatch } from "./patch";

export type User = {
  id: string;
  name: string;
  patches: IdentifiedPatch[];
};
