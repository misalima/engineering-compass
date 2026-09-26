import type { StaticImageData } from "next/image";
import ai from "../../public/assets/images/ai.webp";
import architecture from "../../public/assets/images/architecture.webp";
import database from "../../public/assets/images/database.webp";
import distributed from "../../public/assets/images/distributed.webp";
import go from "../../public/assets/images/go.webp";
import operations from "../../public/assets/images/operations.webp";
import performance from "../../public/assets/images/performance.webp";
import security from "../../public/assets/images/security.webp";

export const GATE_IMAGES: Record<string, StaticImageData> = {
  "depth.go": go,
  "depth.database-engineering": database,
  "depth.distributed-systems": distributed,
  "depth.architecture": architecture,
  "depth.reliability-operations": operations,
  "depth.security": security,
  "depth.performance": performance,
  "depth.ai-engineering": ai,
};
