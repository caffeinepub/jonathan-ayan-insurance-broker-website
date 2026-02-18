import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllSubmissions, useIsCallerAdmin, useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import LoginButton from '../components/LoginButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ShieldAlert, User, Copy, Check, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

export default function AdminPanel() {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: isAdmin, isLoading: adminCheckLoading, isFetched: adminCheckFetched, error: adminCheckError, refetch: refetchAdminStatus } = useIsCallerAdmin();
  const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useGetAllSubmissions();
  const saveProfile = useSaveCallerUserProfile();

  const [profileName, setProfileName] = useState('');
  const [copied, setCopied] = useState(false);

  const isAuthenticated = !!identity;
  const isAuthenticating = loginStatus === 'logging-in' || loginStatus === 'initializing';
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const handleSaveProfile = async () => {
    if (profileName.trim()) {
      await saveProfile.mutateAsync({ name: profileName.trim() });
    }
  };

  const handleCopyPrincipal = async () => {
    if (identity) {
      const principalId = identity.getPrincipal().toString();
      await navigator.clipboard.writeText(principalId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-navy" />
            </div>
            <CardTitle className="text-2xl text-navy">Admin Access Required</CardTitle>
            <CardDescription>
              Please log in with Internet Identity to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <LoginButton />
            <Link to="/" className="text-center text-sm text-muted-foreground hover:text-accent-blue transition-colors">
              ← Back to homepage
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show profile setup dialog
  if (showProfileSetup) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-navy">Welcome! Set up your profile</DialogTitle>
            <DialogDescription>
              Please enter your name to complete your profile setup.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
                className="border-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={!profileName.trim() || saveProfile.isPending}
              className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-navy font-semibold"
            >
              {saveProfile.isPending ? 'Saving...' : 'Save Profile'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Show loading state while checking admin status or authenticating
  if (adminCheckLoading || profileLoading || isAuthenticating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Skeleton className="h-12 w-64 mb-2" />
            <Skeleton className="h-6 w-48 mb-8" />
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Verifying admin access...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if admin check failed
  if (adminCheckError && adminCheckFetched) {
    const principalId = identity?.getPrincipal().toString() || '';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-navy">Authorization Error</CardTitle>
            <CardDescription>
              There was an error checking your admin status.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription className="text-sm">
                {adminCheckError instanceof Error ? adminCheckError.message : 'Unknown error occurred'}
              </AlertDescription>
            </Alert>

            <Alert className="bg-accent-blue/5 border-accent-blue">
              <AlertCircle className="h-4 w-4 text-accent-blue" />
              <AlertTitle className="text-navy">Your Principal ID</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                If you believe you should have admin access, share this Principal ID with the administrator:
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <div className="relative">
                <code className="block w-full p-4 bg-slate-light/50 border-2 border-border rounded-lg text-sm font-mono break-all text-navy">
                  {principalId}
                </code>
                <Button
                  onClick={handleCopyPrincipal}
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 h-8 px-3"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                onClick={() => refetchAdminStatus()}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Admin Check
              </Button>
              <LoginButton />
              <Link to="/" className="text-center text-sm text-muted-foreground hover:text-accent-blue transition-colors">
                ← Back to homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied if not admin (only after admin check is complete)
  if (adminCheckFetched && !isAdmin) {
    const principalId = identity?.getPrincipal().toString() || '';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-navy">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Alert className="bg-accent-blue/5 border-accent-blue">
              <AlertCircle className="h-4 w-4 text-accent-blue" />
              <AlertTitle className="text-navy">Your Principal ID</AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                Share this Principal ID with the administrator to request access:
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <div className="relative">
                <code className="block w-full p-4 bg-slate-light/50 border-2 border-border rounded-lg text-sm font-mono break-all text-navy">
                  {principalId}
                </code>
                <Button
                  onClick={handleCopyPrincipal}
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 h-8 px-3"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This Principal ID needs to be whitelisted by an administrator to grant you access to the admin panel.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                onClick={() => refetchAdminStatus()}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Admin Check
              </Button>
              <LoginButton />
              <Link to="/" className="text-center text-sm text-muted-foreground hover:text-accent-blue transition-colors">
                ← Back to homepage
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format product interest for display
  const formatProductInterest = (interest: any) => {
    if (interest === 'lifeInsurance') return 'Life Insurance';
    if (interest === 'annuities') return 'Annuities';
    return interest;
  };

  // Format gender for display
  const formatGender = (gender: any) => {
    if (gender === 'male') return 'Male';
    if (gender === 'female') return 'Female';
    if (gender === 'nonBinary') return 'Non-Binary';
    return gender;
  };

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
                  Welcome, {userProfile?.name || 'Admin'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-white/80 hover:text-gold transition-colors text-sm">
                ← Back to site
              </Link>
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <Card className="border-2 border-border shadow-xl">
          <CardHeader className="bg-gradient-to-br from-navy/5 to-accent-blue/5 border-b-2 border-border">
            <CardTitle className="text-3xl text-navy">Contact Form Submissions</CardTitle>
            <CardDescription>
              View all leads and inquiries submitted through the contact form
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {submissionsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : submissionsError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error loading submissions</AlertTitle>
                <AlertDescription>
                  {submissionsError instanceof Error ? submissionsError.message : 'There was an error loading the submissions. Please try refreshing the page.'}
                </AlertDescription>
              </Alert>
            ) : !submissions || submissions.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No submissions yet</AlertTitle>
                <AlertDescription>
                  Contact form submissions will appear here once visitors start filling out the form.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-navy">Name</TableHead>
                      <TableHead className="font-bold text-navy">State</TableHead>
                      <TableHead className="font-bold text-navy">Product</TableHead>
                      <TableHead className="font-bold text-navy">Coverage</TableHead>
                      <TableHead className="font-bold text-navy">Age</TableHead>
                      <TableHead className="font-bold text-navy">Gender</TableHead>
                      <TableHead className="font-bold text-navy">Best Time</TableHead>
                      <TableHead className="font-bold text-navy">Best Day</TableHead>
                      <TableHead className="font-bold text-navy">Comments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission, index) => (
                      <TableRow key={index} className="hover:bg-accent-blue/5">
                        <TableCell className="font-medium text-navy">
                          {submission.firstName} {submission.lastName}
                        </TableCell>
                        <TableCell>{submission.state}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-navy/5 text-navy border-navy/20">
                            {formatProductInterest(submission.productInterest)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-gold-dark">
                          ${Number(submission.coverageAmount).toLocaleString()}
                        </TableCell>
                        <TableCell>{Number(submission.age)}</TableCell>
                        <TableCell>{formatGender(submission.gender)}</TableCell>
                        <TableCell className="text-sm">{submission.bestTimeToContact}</TableCell>
                        <TableCell className="text-sm">{submission.bestDayToContact}</TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                          {submission.additionalComments || '—'}
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
