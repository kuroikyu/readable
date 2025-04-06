import { FC } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const Page404: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p>You've wandered off to a 404 page!</p>
      <Button asChild>
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
};

export default Page404;
