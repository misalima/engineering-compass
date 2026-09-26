import raw from "./standard-v1.1.json";
import { standardSchema } from "./schema";

export const ACTIVE_STANDARD_VERSION = "1.1";

export const STANDARD_V1_1 = standardSchema.parse(raw);
