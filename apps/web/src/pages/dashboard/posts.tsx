import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCopy } from "@/hooks/useCopy";
import { toast, Toaster } from "@acme/ui";
import { Layout } from "@/layouts/dashboard-layout";
import { TitleAndMetaTags } from "@/components/seo";
import { queryToClipboard } from "@/consts";

import { GrGraphQl as GraphQL } from "react-icons/gr";
import { IoAdd as Add } from "react-icons/io5";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "@/pages/_app";

const PostsPage: NextPageWithLayout = () => {
  const [copyToClipboard] = useCopy(queryToClipboard);
  const router = useRouter();
  const {} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  const onCopyGraphQLQuery = () => {
    copyToClipboard();
    toast.success("Copied the query to the clipboard!");
  };

  return (
    <>
      <TitleAndMetaTags />
      <Toaster position="bottom-right" />
      <div className="font-default min-h-screen bg-gray-200">
        {/* Top section */}
        <div className="flex w-full items-center justify-center bg-gray-800 px-8 pb-10">
          <div className="w-full max-w-2xl pt-24">
            <h1 className="pb-4 text-4xl font-bold text-slate-50">Posts</h1>
            <p className="text-base leading-7 text-slate-200">
              Create and manage posts. Your posts are only visible to you, and
              are only used for the demonstration of this application. You can
              also copy the GraphQL query and test it on your API client of
              choice.
            </p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex w-full items-center justify-center px-8">
          <div className="flex w-full max-w-2xl items-center justify-between py-8">
            <button
              onClick={onCopyGraphQLQuery}
              type="button"
              className="inline-flex items-center justify-center gap-1 rounded-lg border-2 border-gray-800 bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-800 hover:text-gray-200"
            >
              <GraphQL className="h-5 w-5" />
              Copy the GraphQL query
            </button>
            <a className="inline-flex cursor-pointer items-center justify-center gap-1 rounded-lg border-2 border-gray-800 bg-gray-800 px-4 py-2 text-center text-sm font-semibold text-gray-200 transition duration-100 hover:border-gray-700 hover:bg-gray-700">
              <Add className="h-5 w-5" />
              New post
            </a>
          </div>
        </div>
        {/* Posts */}
        <div className="flex w-full justify-center px-8">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg shadow-gray-300/90">
            {/* Conditional no posts container */}
            <div className="p-8">
              <h2 className="w-full pb-2 text-center text-xl font-semibold text-slate-900">
                No posts created
              </h2>
              <p className="w-full text-center text-sm text-slate-700">
                You have not published any posts yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PostsPage;
