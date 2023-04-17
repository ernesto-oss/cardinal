import { useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { clsx } from "clsx";
import { Search as SearchIcon } from "lucide-react";
import * as docSearchReact from "@docsearch/react";

import { ALGOLIA } from "@/consts";
import "./index.css";

/** FIXME: This is still kinda nasty, but DocSearch is not ESM ready. */
const DocSearchModal = docSearchReact.DocSearchModal || (docSearchReact as any).default.DocSearchModal;
const useDocSearchKeyboardEvents =
  docSearchReact.useDocSearchKeyboardEvents || (docSearchReact as any).default.useDocSearchKeyboardEvents;

const Search: React.FC<{ homepage: boolean }> = ({ homepage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [initialQuery, setInitialQuery] = useState("");

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(
    // @ts-ignore
    (e) => {
      setIsOpen(true);
      setInitialQuery(e.key);
    },
    [setIsOpen, setInitialQuery],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <button
        type="button"
        ref={searchButtonRef}
        onClick={onOpen}
        className={clsx({
          "flex cursor-pointer items-center justify-between gap-12 rounded-md px-4 py-2 text-sm transition duration-100":
            true,
          "text-slate-50 hover:bg-slate-300/10 md:bg-slate-300/10": homepage,
          "w-full bg-slate-400/20 hover:bg-slate-400/30": !homepage,
        })}
      >
        <div className="flex gap-3">
          <SearchIcon size={18} />
          <span
            className={clsx({
              "hidden md:block": homepage,
            })}
          >
            Search docs
          </span>
        </div>
        <span
          className={clsx({
            "font-body text-xs font-bold": true,
            "hidden md:block": homepage,
            // "hidden md:block": !homepage,
          })}
        >
          Ctrl K
        </span>
      </button>

      {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName={ALGOLIA.indexName}
            appId={ALGOLIA.appId}
            apiKey={ALGOLIA.apiKey}
            transformItems={(items) => {
              return items.map((item) => {
                // We transform the absolute URL into a relative URL to
                // work better on localhost, preview URLS.
                const a = document.createElement("a");
                a.href = item.url;
                const hash = a.hash === "#overview" ? "" : a.hash;
                return {
                  ...item,
                  url: `${a.pathname}${hash}`,
                };
              });
            }}
          />,
          document.body,
        )}
    </>
  );
};

export default Search;
