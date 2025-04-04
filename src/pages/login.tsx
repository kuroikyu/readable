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
import { loginUser } from "@/store/authSlice";

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
    <Card className="w-full max-w-md">
      <CardHeader className="gap-y-2">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
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
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              name="userId"
              type="text"
              placeholder="steve879"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <div className="text-sm text-gray-600">
          Don't have an accont?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
