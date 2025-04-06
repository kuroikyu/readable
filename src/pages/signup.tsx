import { AlertCircle } from "lucide-react";
import { FC, FormEvent, useState } from "react";
import { Link } from "react-router";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Signup: FC = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (password !== password2) {
      setPasswordError("Passwords do not match");
      return;
    }

    dispatch(signupUser({ userId, password, firstName, lastName }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="gap-y-2">
        <CardTitle className="text-2xl font-bold">Create an accont</CardTitle>
        <CardDescription>
          Join Readable and start your reading spree
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          {(error || passwordError) && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{error || passwordError}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="userId">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="userId"
              name="userId"
              type="text"
              placeholder="Username"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="password2">
              Confirm your password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password2"
              name="password2"
              type="password"
              placeholder="Password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              name="first-name"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              name="last-name"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating your account..." : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Signup;
