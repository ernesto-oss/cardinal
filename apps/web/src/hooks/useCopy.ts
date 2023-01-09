import copyToClipboard from "copy-to-clipboard";
import { useRef, useCallback } from "react";

export function useCopy(str: string): [() => void] {
  const copyableString = useRef(str);
  const copyAction = useCallback(() => {
    copyToClipboard(copyableString.current);
  }, [copyableString]);

  return [copyAction];
}
