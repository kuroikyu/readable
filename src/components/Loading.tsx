import { FC } from "react";
import { LoaderCircle } from "lucide-react";

const Loading: FC = () => (
  <div className="flex min-h-screen items-center justify-center gap-2">
    <LoaderCircle className="animate-spin" />
    <p>Loading...</p>
  </div>
);

export default Loading;
