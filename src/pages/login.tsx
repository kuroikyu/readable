import { FC, FormEvent, useState } from "react";
import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/feature/auth/authSlice";

const Login: FC = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(loginUser({ userId, password }));
  };

  return (
    <Card className="text-brand-secondary-700 w-full max-w-md">
      <CardHeader className="gap-y-2">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription className="text-brand-secondary-800/70">
          Enter your credentials to start reading
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="userId">Username</Label>
            <Input
              id="userId"
              name="Username"
              type="text"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="relative flex flex-col gap-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to="/forgot-password"
              className="text-brand-primary-500 hover:text-brand-primary-800 absolute top-0 right-0 float-right text-xs"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="from-brand-secondary-500 to-brand-primary-500 hover:from-brand-secondary-400 hover:to-brand-primary-400 bg-linear-to-r"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <div className="text-brand-secondary-700/70 text-sm">
          <span>Don't have an account? </span>
          <Link
            to="/signup"
            className="text-brand-primary-600 hover:text-brand-primary-800"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
