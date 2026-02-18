import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile } from '../backend';
import { Gender, ProductInterest } from '../backend';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  // Return custom state that properly reflects actor dependency
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

// Contact Form Queries
export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      state: string;
      productInterest: 'life-insurance' | 'annuities';
      coverageAmount: string;
      age: string;
      gender: 'male' | 'female';
      additionalComments: string;
      bestTimeToContact: string;
      bestDayToContact: string;
    }) => {
      console.log('=== MUTATION FUNCTION STARTED ===');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Actor availability:', !!actor);
      
      if (!actor) {
        console.error('ERROR: Actor not available');
        throw new Error('Actor not available');
      }

      console.log('Actor is available, proceeding with data transformation...');

      try {
        // Map frontend values to backend enum types
        console.log('Mapping productInterest:', data.productInterest);
        const productInterest = data.productInterest === 'life-insurance' 
          ? ProductInterest.lifeInsurance 
          : ProductInterest.annuities;
        console.log('Mapped productInterest to:', productInterest);

        console.log('Mapping gender:', data.gender);
        const gender = data.gender === 'male' ? Gender.male : Gender.female;
        console.log('Mapped gender to:', gender);

        // Convert coverage amount string to number (remove $ and commas)
        console.log('Converting coverageAmount:', data.coverageAmount);
        const coverageAmount = data.coverageAmount.replace(/[$,]/g, '');
        const coverageAmountBigInt = coverageAmount ? BigInt(coverageAmount) : BigInt(0);
        console.log('Converted coverageAmount to BigInt:', coverageAmountBigInt.toString());

        console.log('Converting age:', data.age);
        const ageBigInt = BigInt(data.age);
        console.log('Converted age to BigInt:', ageBigInt.toString());

        console.log('Calling backend submitContactForm with parameters:');
        console.log('  firstName:', data.firstName);
        console.log('  lastName:', data.lastName);
        console.log('  state:', data.state);
        console.log('  productInterest:', productInterest);
        console.log('  coverageAmount:', coverageAmountBigInt.toString());
        console.log('  age:', ageBigInt.toString());
        console.log('  gender:', gender);
        console.log('  additionalComments:', data.additionalComments);
        console.log('  bestTimeToContact:', data.bestTimeToContact);
        console.log('  bestDayToContact:', data.bestDayToContact);

        const result = await actor.submitContactForm(
          data.firstName,
          data.lastName,
          data.state,
          productInterest,
          coverageAmountBigInt,
          ageBigInt,
          gender,
          data.additionalComments,
          data.bestTimeToContact,
          data.bestDayToContact
        );

        console.log('✓ Backend call successful');
        console.log('Result:', result);
        return result;
      } catch (error: any) {
        console.error('=== MUTATION ERROR ===');
        console.error('Error timestamp:', new Date().toISOString());
        console.error('Error during backend call or data transformation');
        console.error('Full error object:', error);
        console.error('Error message:', error?.message);
        console.error('Error name:', error?.name);
        console.error('Error stack:', error?.stack);
        console.error('Error cause:', error?.cause);
        
        if (error?.response) {
          console.error('Error response data:', error.response);
        }
        
        if (error?.request) {
          console.error('Error request data:', error.request);
        }

        // Check for specific error types
        if (error instanceof TypeError) {
          console.error('TypeError detected - likely data conversion issue');
        } else if (error instanceof RangeError) {
          console.error('RangeError detected - likely BigInt conversion issue');
        }

        console.error('=== END MUTATION ERROR LOG ===');
        
        // Re-throw to propagate to component
        throw error;
      }
    },
  });
}

export function useGetAllSubmissions() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ['submissions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !actorFetching,
  });
}
