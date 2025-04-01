import { FC, FormEvent, useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router";
import { AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearError, loginUser } from "../store/authSlice";
import { Alert, AlertDescription } from "../components/ui/alert";

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, loading, error } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }

    return () => {
      // Clear errors once the user is authenticated
      dispatch(clearError())
    }
  }, [isAuthenticated, navigate, dispatch])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="gap-y-2">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to start reading</CardDescription>
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="steve@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
      </Card>
    </div >
  )
}

export default Login
