import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ShieldAlert, User } from "lucide-react";
import LoginButton from "../components/LoginButton";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAllSubmissions,
  useGetCallerUserProfile,
  useIsCallerAdmin,
  useIsCallerOwner,
} from "../hooks/useQueries";

export default function AdminPanel() {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();

  const {
    data: isOwner,
    isLoading: ownerLoading,
    isFetched: ownerFetched,
  } = useIsCallerOwner();

  const {
    data: isAdmin,
    isLoading: adminLoading,
    isFetched: adminFetched,
  } = useIsCallerAdmin();

  const {
    data: submissions,
    isLoading: submissionsLoading,
    error: submissionsError,
  } = useGetAllSubmissions();

  const isAuthenticated = !!identity;
  const isAuthenticating =
    loginStatus === "logging-in" || loginStatus === "initializing";

  const hasAccess = isOwner === true || isAdmin === true;
  const accessChecked = ownerFetched && adminFetched;

  // Format product interest for display
  const formatProductInterest = (interest: unknown) => {
    if (interest === "lifeInsurance") return "Life Insurance";
    if (interest === "annuities") return "Annuities";
    return String(interest);
  };

  // Format gender for display
  const formatGender = (gender: unknown) => {
    if (gender === "male") return "Male";
    if (gender === "female") return "Female";
    if (gender === "nonBinary") return "Non-Binary";
    return String(gender);
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated && !isAuthenticating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-navy" />
            </div>
            <CardTitle className="text-2xl text-navy">
              Admin Access Required
            </CardTitle>
            <CardDescription>
              Please log in with Internet Identity to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <LoginButton />
            <Link
              to="/"
              data-ocid="admin.home.link"
              className="text-center text-sm text-muted-foreground hover:text-accent-blue transition-colors"
            >
              ← Back to homepage
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state while authenticating or checking access
  if (isAuthenticating || ownerLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 p-6">
        <div className="container mx-auto max-w-7xl">
          <div
            data-ocid="admin.loading_state"
            className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
          >
            <Skeleton className="h-12 w-64 mb-2" />
            <Skeleton className="h-6 w-48 mb-8" />
            <p className="text-sm text-muted-foreground">
              Verifying admin access...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show access denied if neither owner nor admin (only after both checks complete)
  if (accessChecked && !hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 flex items-center justify-center p-6">
        <Card className="max-w-lg w-full" data-ocid="admin.access_denied.card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-navy">Access Denied</CardTitle>
            <CardDescription>
              Your account does not have permission to access the admin panel.
              Please contact the site administrator.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Alert
              variant="destructive"
              data-ocid="admin.access_denied.error_state"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Unauthorized</AlertTitle>
              <AlertDescription className="text-sm">
                Only authorized administrators can view this page. If you
                believe you should have access, contact Jonathan Ayan at
                jonathanayan.eip@gmail.com.
              </AlertDescription>
            </Alert>
            <LoginButton />
            <Link
              to="/"
              data-ocid="admin.home.link"
              className="text-center text-sm text-muted-foreground hover:text-accent-blue transition-colors"
            >
              ← Back to homepage
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render admin dashboard (only when access is confirmed)
  if (!accessChecked) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-navy to-navy-dark text-white border-b-4 border-gold">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-white/70 text-sm">
                  Welcome, {userProfile?.name || "Admin"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                data-ocid="admin.home.link"
                className="text-white/80 hover:text-gold transition-colors text-sm"
              >
                ← Back to site
              </Link>
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <Card
          className="border-2 border-border shadow-xl"
          data-ocid="admin.submissions.table"
        >
          <CardHeader className="bg-gradient-to-br from-navy/5 to-accent-blue/5 border-b-2 border-border">
            <CardTitle className="text-3xl text-navy">
              Contact Form Submissions
            </CardTitle>
            <CardDescription>
              View all leads and inquiries submitted through the contact form
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {submissionsLoading ? (
              <div
                data-ocid="admin.submissions.loading_state"
                className="space-y-4"
              >
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : submissionsError ? (
              <Alert
                variant="destructive"
                data-ocid="admin.submissions.error_state"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error loading submissions</AlertTitle>
                <AlertDescription>
                  {submissionsError instanceof Error
                    ? submissionsError.message
                    : "There was an error loading the submissions. Please try refreshing the page."}
                </AlertDescription>
              </Alert>
            ) : !submissions || submissions.length === 0 ? (
              <Alert data-ocid="admin.submissions.empty_state">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No submissions yet</AlertTitle>
                <AlertDescription>
                  Contact form submissions will appear here once visitors start
                  filling out the form.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-navy">
                        Name
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        State
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Product
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Coverage
                      </TableHead>
                      <TableHead className="font-bold text-navy">Age</TableHead>
                      <TableHead className="font-bold text-navy">
                        Gender
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Best Time
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Best Day
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Comments
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission, index) => (
                      <TableRow
                        key={`${submission.firstName}-${submission.lastName}-${index}`}
                        data-ocid={`admin.submissions.item.${index + 1}`}
                        className="hover:bg-accent-blue/5"
                      >
                        <TableCell className="font-medium text-navy">
                          {submission.firstName} {submission.lastName}
                        </TableCell>
                        <TableCell>{submission.state}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-navy/5 text-navy border-navy/20"
                          >
                            {formatProductInterest(submission.productInterest)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-gold-dark">
                          ${Number(submission.coverageAmount).toLocaleString()}
                        </TableCell>
                        <TableCell>{Number(submission.age)}</TableCell>
                        <TableCell>{formatGender(submission.gender)}</TableCell>
                        <TableCell className="text-sm">
                          {submission.bestTimeToContact}
                        </TableCell>
                        <TableCell className="text-sm">
                          {submission.bestDayToContact}
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                          {submission.additionalComments || "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
