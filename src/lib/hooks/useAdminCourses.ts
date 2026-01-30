import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAdminCourse,
  fetchAdminCourses,
  type AdminCoursePayload,
} from "@/lib/services/adminCourses";

export function useAdminCourses() {
  return useQuery({
    queryKey: ["admin-courses"],
    queryFn: fetchAdminCourses,
  });
}

export function useCreateAdminCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminCoursePayload) => createAdminCourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    },
  });
}
