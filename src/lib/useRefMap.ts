import { Ref, createRef, useState } from "react";

export default function useRefMap<T>(keys: string[]) {
  const [refs, setRefs] = useState<Map<string, Ref<T>>>(
    new Map(keys.map((key) => [key, createRef<T>()]))
  );

  return refs;
}
