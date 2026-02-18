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
      if (!actor) throw new Error('Actor not available');

      // Map frontend values to backend enum types
      const productInterest = data.productInterest === 'life-insurance' 
        ? ProductInterest.lifeInsurance 
        : ProductInterest.annuities;

      const gender = data.gender === 'male' ? Gender.male : Gender.female;

      // Convert coverage amount string to number (remove $ and commas)
      const coverageAmount = data.coverageAmount.replace(/[$,]/g, '');
      const coverageAmountBigInt = coverageAmount ? BigInt(coverageAmount) : BigInt(0);

      return actor.submitContactForm(
        data.firstName,
        data.lastName,
        data.state,
        productInterest,
        coverageAmountBigInt,
        BigInt(data.age),
        gender,
        data.additionalComments,
        data.bestTimeToContact,
        data.bestDayToContact
      );
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
