import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllSubmissions, useIsCallerAdmin, useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import LoginButton from '../components/LoginButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ShieldAlert, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

export default function AdminPanel() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: isAdmin, isLoading: adminCheckLoading, isFetched: adminCheckFetched } = useIsCallerAdmin();
  const { data: submissions, isLoading: submissionsLoading, error: submissionsError } = useGetAllSubmissions();
  const saveProfile = useSaveCallerUserProfile();

  const [profileName, setProfileName] = useState('');

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const handleSaveProfile = async () => {
    if (profileName.trim()) {
      await saveProfile.mutateAsync({ name: profileName.trim() });
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

  // Show loading state while checking admin status
  if (adminCheckLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 p-6">
        <div className="container mx-auto max-w-7xl">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  // Show access denied if not admin (only after admin check is complete)
  if (adminCheckFetched && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-light via-background to-accent-blue/5 flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-navy">Access Denied</CardTitle>
            <CardDescription>
              You do not have permission to access the admin panel.
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
                  There was an error loading the submissions. Please try refreshing the page.
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
                        <TableCell className="font-medium">
                          {submission.firstName} {submission.lastName}
                        </TableCell>
                        <TableCell>{submission.state}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-accent-blue/10 text-accent-blue border-accent-blue">
                            {formatProductInterest(submission.productInterest)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          ${Number(submission.coverageAmount).toLocaleString()}
                        </TableCell>
                        <TableCell>{Number(submission.age)}</TableCell>
                        <TableCell>{formatGender(submission.gender)}</TableCell>
                        <TableCell>{submission.bestTimeToContact || '—'}</TableCell>
                        <TableCell>
                          {submission.bestDayToContact ? `Day ${submission.bestDayToContact}` : '—'}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={submission.additionalComments}>
                            {submission.additionalComments || '—'}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-sm text-muted-foreground text-center">
                  Total submissions: {submissions.length}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
