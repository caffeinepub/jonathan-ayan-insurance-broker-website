import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserProfile } from "../backend";
import { Gender, ProductInterest } from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { loginStatus } = useInternetIdentity();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && loginStatus !== "initializing",
    retry: false,
  });

  return {
    ...query,
    isLoading:
      actorFetching || loginStatus === "initializing" || query.isLoading,
    isFetched: !!actor && loginStatus !== "initializing" && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();
  const { loginStatus } = useInternetIdentity();

  const query = useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) {
        throw new Error("Actor not available");
      }
      try {
        const isAdmin = await actor.isCallerAdmin();
        return isAdmin;
      } catch (error) {
        console.error("[useIsCallerAdmin] Error checking admin status:", error);
        throw error;
      }
    },
    enabled: !!actor && !actorFetching && loginStatus !== "initializing",
    retry: 2,
    retryDelay: 1000,
  });

  return {
    ...query,
    isLoading:
      actorFetching || loginStatus === "initializing" || query.isLoading,
    isFetched: !!actor && loginStatus !== "initializing" && query.isFetched,
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
      productInterest: string;
      coverageAmount: string;
      age: string;
      gender: string;
      additionalComments: string;
      bestTimeToContact: string;
      bestDayToContact: string;
    }) => {
      if (!actor) {
        throw new Error("Actor not available");
      }

      // Map frontend productInterest value to backend enum
      let productInterest: ProductInterest;
      if (
        data.productInterest === "life-insurance" ||
        data.productInterest === "lifeInsurance"
      ) {
        productInterest = ProductInterest.lifeInsurance;
      } else if (data.productInterest === "annuities") {
        productInterest = ProductInterest.annuities;
      } else {
        throw new Error(
          `Invalid product interest value: ${data.productInterest}`,
        );
      }

      // Map frontend gender value to backend enum
      let gender: Gender;
      if (data.gender === "male") {
        gender = Gender.male;
      } else if (data.gender === "female") {
        gender = Gender.female;
      } else if (data.gender === "nonBinary") {
        gender = Gender.nonBinary;
      } else {
        throw new Error(`Invalid gender value: ${data.gender}`);
      }

      // Convert coverage amount string to BigInt (remove $, commas, and any non-numeric chars)
      const coverageAmountStr = data.coverageAmount.replace(/[^0-9]/g, "");
      const coverageAmountBigInt = coverageAmountStr
        ? BigInt(coverageAmountStr)
        : BigInt(0);

      // Convert age to BigInt safely (parseInt handles decimals and leading zeros)
      const ageInt = Number.parseInt(data.age, 10);
      if (Number.isNaN(ageInt)) {
        throw new Error("Invalid age value");
      }
      const ageBigInt = BigInt(ageInt);

      return actor.submitContactForm(
        data.firstName,
        data.lastName,
        data.state,
        productInterest,
        coverageAmountBigInt,
        ageBigInt,
        gender,
        data.additionalComments,
        data.bestTimeToContact,
        data.bestDayToContact,
      );
    },
  });
}

export function useInitializeAccessControl() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (secret: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor._initializeAccessControlWithSecret(secret);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetAllSubmissions() {
  const { actor, isFetching: actorFetching } = useActor();
  const { loginStatus } = useInternetIdentity();

  return useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !actorFetching && loginStatus !== "initializing",
    retry: 2,
    retryDelay: 1000,
  });
}
